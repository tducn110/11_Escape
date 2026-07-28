import fs from "node:fs/promises";
import path from "node:path";

const CHROME_DEBUG_URL = "http://127.0.0.1:9222";
const APP_URL = "http://127.0.0.1:4173/";
const OUTPUT_DIR = "/tmp/11_escape_task8";

const viewports = [
  { width: 375, height: 667, mobile: true, label: "375x667" },
  { width: 390, height: 844, mobile: true, label: "390x844" },
  { width: 430, height: 932, mobile: true, label: "430x932" },
  { width: 844, height: 390, mobile: true, label: "844x390" },
  { width: 768, height: 1024, mobile: true, label: "768x1024" },
  { width: 1366, height: 768, mobile: false, label: "1366x768" },
  { width: 1440, height: 900, mobile: false, label: "1440x900" },
];

await fs.mkdir(OUTPUT_DIR, { recursive: true });

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function createTarget(url) {
  const response = await fetch(`${CHROME_DEBUG_URL}/json/new?${encodeURIComponent(url)}`, {
    method: "PUT",
  });
  return response.json();
}

async function closeTarget(targetId) {
  await fetch(`${CHROME_DEBUG_URL}/json/close/${targetId}`);
}

function createClient(wsUrl) {
  const socket = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  const events = new Map();

  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data.toString());

    if (typeof message.id === "number") {
      const resolver = pending.get(message.id);
      if (!resolver) return;
      pending.delete(message.id);
      if (message.error) {
        resolver.reject(new Error(message.error.message));
      } else {
        resolver.resolve(message.result);
      }
      return;
    }

    const listeners = events.get(message.method) ?? [];
    for (const listener of listeners) {
      listener(message.params ?? {});
    }
  });

  const opened = new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  return {
    socket,
    opened,
    on(method, listener) {
      const listeners = events.get(method) ?? [];
      listeners.push(listener);
      events.set(method, listeners);
    },
    send(method, params = {}) {
      const messageId = ++id;
      const payload = { id: messageId, method, params };
      return new Promise((resolve, reject) => {
        pending.set(messageId, { resolve, reject });
        socket.send(JSON.stringify(payload));
      });
    },
  };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  return result.result?.value;
}

async function clickUnit(client, index) {
  await evaluate(
    client,
    `(() => {
      const units = Array.from(document.querySelectorAll('[role="button"]')).filter((node) => node.getAttribute('aria-label')?.startsWith('Nhân vật'));
      const target = units[${index}] ?? null;
      if (!target) return false;
      target.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
      return true;
    })()`
  );
}

async function waitForLoad(client) {
  await new Promise((resolve) => {
    client.on("Page.loadEventFired", () => resolve());
  });
}

async function captureViewport(viewport) {
  const target = await createTarget(APP_URL);
  const client = createClient(target.webSocketDebuggerUrl);
  await client.opened;

  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("DOM.enable");
  await client.send("Page.addScriptToEvaluateOnNewDocument", {
    source: `
      localStorage.removeItem("tribeout_progress");
      localStorage.removeItem("tribeout_highest_level");
      localStorage.removeItem("tribeout_current_level");
      localStorage.removeItem("tribeout_level_stars");
      localStorage.removeItem("tribeout_coins");
    `,
  });

  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: 1,
    mobile: viewport.mobile,
  });

  const loadPromise = waitForLoad(client);
  await client.send("Page.navigate", { url: APP_URL });
  await loadPromise;
  await delay(400);

  const baseMetrics = await evaluate(
    client,
    `(() => {
      const shell = document.querySelector('.game-shell');
      const board = document.querySelector('[aria-label="Bàn chơi 2048"]') || document.querySelector('.tribe-board-center');
      const hud = document.querySelector('.game-shell__header');
      const controls = document.querySelector('.game-shell__controls');
      const canvas = board?.querySelector('canvas') ?? null;
      const buttons = Array.from(document.querySelectorAll('[role="button"]'));
      const buttonLabels = buttons.map((node) => node.getAttribute('aria-label') ?? '');
      const toRect = (node) => {
        if (!node) return null;
        const rect = node.getBoundingClientRect();
        return {
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          bottom: rect.bottom,
          right: rect.right,
        };
      };
      const docEl = document.documentElement;
      return {
        scrollHeight: docEl.scrollHeight,
        clientHeight: docEl.clientHeight,
        scrollWidth: docEl.scrollWidth,
        clientWidth: docEl.clientWidth,
        shellRect: toRect(shell),
        boardRect: toRect(board),
        hudRect: toRect(hud),
        controlsRect: toRect(controls),
        canvasRect: toRect(canvas),
        canvasBackingSize: canvas ? { width: canvas.width, height: canvas.height } : null,
        canvasMatchesBoard: Boolean(
          canvas &&
          board &&
          Math.abs(canvas.getBoundingClientRect().width - board.getBoundingClientRect().width) <= 1 &&
          Math.abs(canvas.getBoundingClientRect().height - board.getBoundingClientRect().height) <= 1
        ),
        verticalScrollable: docEl.scrollHeight > docEl.clientHeight + 1,
        horizontalScrollable: docEl.scrollWidth > docEl.clientWidth + 1,
        unitButtons: buttonLabels.filter((label) => label.startsWith('Nhân vật')).length,
        nonUnitButtons: buttonLabels.filter((label) => label && !label.startsWith('Nhân vật')).length,
        nonUnitEntityButtons: buttonLabels.filter((label) => /^(Chướng ngại vật|Cổng|Công tắc)/.test(label)).length,
      };
    })()`
  );

  if (baseMetrics.nonUnitButtons !== 0 || baseMetrics.nonUnitEntityButtons !== 0) {
    throw new Error(`Unexpected non-unit button exposure: ${JSON.stringify({
      nonUnitButtons: baseMetrics.nonUnitButtons,
      nonUnitEntityButtons: baseMetrics.nonUnitEntityButtons,
    })}`);
  }

  const baseScreenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  });
  const baseScreenshotPath = path.join(OUTPUT_DIR, `${viewport.label}-base.png`);
  await fs.writeFile(baseScreenshotPath, Buffer.from(baseScreenshot.data, "base64"));

  await clickUnit(client, 0);
  await delay(700);
  await clickUnit(client, 0);
  await delay(700);
  await clickUnit(client, 0);
  await delay(900);

  const afterWin = await evaluate(
    client,
    `(() => {
      const overlayTitle = Array.from(document.querySelectorAll('.game-overlay-frame__title')).map((node) => node.textContent?.trim());
      const nextButton = Array.from(document.querySelectorAll('button')).find((node) => node.textContent?.includes('Màn Tiếp'));
      const replayButton = Array.from(document.querySelectorAll('button')).find((node) => node.textContent?.includes('Chơi Lại Màn Này') || node.textContent?.includes('Thử lại'));
      if (replayButton) replayButton.click();
      return {
        overlayTitle,
        hasNextButton: Boolean(nextButton),
        hasReplayButton: Boolean(replayButton),
      };
    })()`
  );

  await delay(200);

  const afterReplay = await evaluate(
    client,
    `(() => {
      const overlayVisible = Boolean(document.querySelector('.game-overlay-frame'));
      const units = Array.from(document.querySelectorAll('[role="button"]')).filter((node) => node.getAttribute('aria-label')?.startsWith('Nhân vật'));
      return {
        overlayVisible,
        unitButtons: units.length,
      };
    })()`
  );

  await clickUnit(client, 0);
  await delay(700);
  await clickUnit(client, 0);
  await delay(700);
  await clickUnit(client, 0);
  await delay(900);

  await evaluate(
    client,
    `(() => {
      const nextButton = Array.from(document.querySelectorAll('button')).find((node) => node.textContent?.includes('Màn Tiếp'));
      if (nextButton) {
        nextButton.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));
        return true;
      }
      return false;
    })()`
  );
  await delay(300);

  const afterNext = await evaluate(
    client,
    `(() => {
      const levelValue = document.querySelector('.tribe-game-header__level')?.textContent?.trim() ?? null;
      return { levelValue };
    })()`
  );

  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  });
  const screenshotPath = path.join(OUTPUT_DIR, `${viewport.label}.png`);
  await fs.writeFile(screenshotPath, Buffer.from(screenshot.data, "base64"));

  client.socket.close();
  await closeTarget(target.id);

  return {
    viewport: viewport.label,
    baseScreenshotPath,
    screenshotPath,
    baseMetrics,
    afterWin,
    afterReplay,
    afterNext,
  };
}

const results = [];
for (const viewport of viewports) {
  results.push(await captureViewport(viewport));
}

console.log(JSON.stringify(results, null, 2));
