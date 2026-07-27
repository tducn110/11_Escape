import { Trophy, Coins } from "lucide-react";
import { Button } from "../../../components/shared/Button";
import type { TribeOutProgressSnapshot } from "../types";
import { LEVELS } from "../levels";

interface DashboardProps {
  progress: TribeOutProgressSnapshot;
  onBack?: () => void;
  onPlay?: () => void;
}

export function DashboardScreen({ progress, onBack, onPlay }: DashboardProps) {
  const handleBack = onBack ?? onPlay ?? (() => {});
  const highestLevel = Math.min((progress.highestUnlockedLevel ?? 0) + 1, LEVELS.length);
  const coins = progress.coins ?? 0;

  return (
    <div
      className="bg-[#fdf6ea] rounded-[24px] p-[32px_24px] border-[2px] border-[#8a7d65]/15 shadow-[0_14px_40px_rgba(42,36,24,0.18),0_2px_0_rgba(255,255,255,0.6)_inset] flex flex-col gap-[24px] relative w-full box-border max-h-[calc(100dvh-32px)] min-h-0 overflow-y-auto overscroll-contain"
    >
      <div className="flex items-center justify-center gap-3">
        <Trophy size={28} className="text-[#e87432]" />
        <h1 className="font-['Be_Vietnam_Pro',sans-serif] font-extrabold text-[clamp(24px,5vw,28px)] text-[#2a2418] m-0 leading-[1.2]">
          Thành Tích
        </h1>
      </div>
      <div className="bg-[#8a7d65]/10 p-[16px_18px] sm:p-[20px_24px] rounded-[20px] flex shrink-0 flex-col items-center gap-[8px]">
        <div className="text-[14px] text-[#8a7d65] font-bold uppercase tracking-[0.05em]">Màn Chơi Cao Nhất</div>
        <div className="text-[36px] leading-[1.05] font-extrabold text-[#e87432]">
          Màn {highestLevel} / {LEVELS.length}
        </div>
      </div>

      <section className="flex flex-col gap-[12px] text-left">
        <div className="flex items-center justify-between gap-[12px] shrink-0">
          <div className="flex items-center gap-[8px]">
            <Coins size={22} className="text-[#e87432]" />
            <h2 className="m-0 text-[18px] leading-[1.2] text-[#2a2418] font-extrabold">
              Tài Sản
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div
            className="grid grid-cols-[auto_minmax(0,1fr)_minmax(58px,auto)] items-center gap-[8px] rounded-[16px] p-[10px_12px] sm:grid-cols-[auto_minmax(0,1fr)_minmax(68px,auto)] sm:gap-[12px] sm:p-[12px_16px]"
            style={{
              background: "rgba(232,116,50,0.16)",
              border: "2px solid rgba(232,116,50,0.45)",
            }}
          >
            <div className="h-[34px] w-full min-w-0 rounded-[10px] grid place-items-center text-[11px] font-extrabold px-[10px] leading-none bg-[#e87432] text-white">
              Vàng
            </div>

            <div className="min-w-0">
              <span className="text-[13px] font-bold text-[#4a4232] truncate leading-tight">
                Tổng xu thu thập
              </span>
            </div>

            <div className="min-w-0 whitespace-nowrap text-[#e87432] text-[13px] font-extrabold text-right">
              {coins.toLocaleString("vi-VN")}
            </div>
          </div>
        </div>
      </section>

      <Button onClick={handleBack} size="md" variant="secondary" className="mt-2">
        ← Quay lại
      </Button>
    </div>
  );
}
