# Kế hoạch nâng cấp logic puzzle, solver và difficulty curve

> Trạng thái: **PLAN**
>
> Phạm vi: logic, dữ liệu level, persistence progress, công cụ xác thực và
> difficulty curve.
> Không phải tài liệu triển khai UI hoặc asset.

## 1. Mục tiêu

Biến Tribe Out từ game chủ yếu khó vì bàn đông và timer ngắn thành puzzle có thể
thiết kế, đo lường và xác thực được.

1. Mỗi level có bằng chứng solvable từ cùng bộ luật mà runtime đang dùng.
2. Level data không có overlap, out-of-bounds, gate target sai hoặc state không
   thể đạt.
3. Độ khó tăng bằng dependency, rotate và gate/switch thay vì chỉ thêm unit.
4. Generator chỉ nhận candidate đạt target thiết kế sau khi qua solver.
5. Ít nhất 20–30 level đầu được handcraft theo progression rõ ràng.

## 2. Bối cảnh và source of truth

Snapshot dùng để phân tích ban đầu không có branch, commit và git status. Vì
vậy baseline định lượng trong snapshot là **CONTEXT_INCOMPLETE** cho tới khi tool
mới tái tạo report từ source live.

Những điểm sau đã được đối chiếu với source đang mở:

| Thực trạng | Source | Hệ quả |
| --- | --- | --- |
| Entity gồm unit, obstacle, gate và switch; gate/switch có state riêng. | **src/features/tribe-out/types.ts** | Solver phải mô hình hóa state, không chỉ graph tĩnh. |
| Exit quét toàn bộ footprint phía trước; switch trên đường đi mở gate mục tiêu. | **src/features/tribe-out/gameLogic.ts** | Tool và runtime phải dùng cùng transition. |
| Initial, next-level và reset đều cấp một rotate charge. | **src/features/tribe-out/gameLogic.ts** | Rotate chưa là tài nguyên theo level. |
| Timer về 0 chỉ dừng giảm, không làm mất game. | **src/features/tribe-out/TribeOutGame.tsx** | Timer không thuộc điều kiện solvability hiện tại. |
| Solver chỉ greedy-exit và chỉ chạy riêng level 22. | **scripts/solver.ts** | Chưa có chứng minh cho toàn bộ level. |
| Có 5 level handcraft, phần còn lại được generator sinh tới level 100. | **scripts/handcrafted_levels.cjs**, **scripts/gen_levels.cjs** | Progression đầu game chưa đủ curated. |
| Level 5 có footprint unit chồng nhau. | **scripts/handcrafted_levels.cjs** | Đây là lỗi data, phải chặn bằng validator và re-author level. |
| Progress chỉ lưu coin, level index và star theo index; chưa có schema hay content ID. | **src/features/tribe-out/tribeOutStorage.ts**, **types.ts** | Re-author Level 1–30 bắt buộc có migration progress. |
| Switch có button role và gửi tap; domain logic chưa từ chối switch/gate ở boundary. | **src/features/tribe-out/TribeOutEntity.tsx**, **gameLogic.ts** | Tap switch hiện có thể mất life; UI và domain guard phải được sửa cùng nhau. |
| CLI tools đang lẫn ESM TypeScript với CommonJS; package chưa có runner/script level chính thức. | **package.json**, **scripts/solver.ts**, **scripts/gen_levels.cjs** | Cần chốt một toolchain trước khi chia sẻ engine. |
| Checkpoint cũ vẫn nói game có 10 level. | **doc/planning/CHECKPOINT.md** | Đồng bộ tài liệu sau khi source of truth mới ổn định. |

Các con số trong snapshot, chẳng hạn level 100 có nhiều unit thoát ngay và
critical path ngắn, là baseline thiết kế hữu ích nhưng chưa được xem là CI fact
cho đến khi analyzer mới chạy lại trên **levels.ts**.

## 3. Mô hình puzzle cần chốt

### 3.1. Hai lớp bài toán

Với level chỉ có unit và obstacle, nếu A chặn đường thoát của B thì:

~~~text
A -> B
~~~

A phải rời board trước B. Đây là topological elimination trên DAG nếu data hợp
lệ và không có rotate, gate hay switch.

Với rotate, gate và switch, level là tìm đường trong không gian trạng thái:

~~~text
state = escaped units
      + current directions
      + gate open states
      + switch activated states
      + rotate charges remaining

action = Exit(unit) | Rotate(unit)
~~~

Thắng khi mọi unit escaped. Một level chỉ được gọi là solvable khi solver tìm
được chuỗi action từ state đầu đến state thắng.

### 3.2. Quy ước v1

- Gate chỉ mở một chiều và giữ mở vĩnh viễn.
- Switch chỉ kích hoạt một lần; switch phải trỏ tới một gate tồn tại.
- Rotate quay 90 độ theo chiều kim đồng hồ và tiêu một charge, đúng runtime.
- Solver chỉ xét action hợp lệ của puzzle. Tap unit bị chặn để mất life là lỗi
  thao tác, không phải nhánh lời giải.
- Timer, coin, sao, audio và persistence không thuộc state solvability.
- Unit, obstacle và gate đóng là occupancy vật lý độc quyền. Switch không chặn
  đường nhưng không được chồng lên footprint tĩnh ban đầu của entity vật lý.
- Chỉ unit chưa escaped được interactive, focusable hoặc có thể trở thành
  PuzzleAction. Obstacle, gate và switch là môi trường, không phải button.
- Boundary domain phải từ chối mọi tap/rotate không nhắm một live unit mà không
  trừ life, charge hoặc thay state. Không dựa vào CSS để bảo vệ rule này.
- Không thêm toggle gate, gate đóng lại hoặc mechanic đảo chiều trước khi solver
  có representation, test và UX signal cho chúng.

## 4. Kiến trúc đích

Luật puzzle cần một implementation pure duy nhất. Runtime React và CLI solver
cùng gọi implementation này để game và tool không thể drift.

~~~text
Level data
    |
    +--> static validator
    |
    +--> pure puzzle transition engine <--- React adapter in gameLogic
    |             |
    |             +--> state-space solver
    |             +--> difficulty analyzer
    |
    +--> handcrafted authoring / constrained generator
~~~

API định hướng:

~~~ts
PuzzleAction = Exit(unitId) | Rotate(unitId)
PuzzleState = entities + rotateCharges

listLegalPuzzleActions(level, state)
applyPuzzleAction(level, state, action)
validateLevel(level)
solveLevel(level, options)
analyzeLevel(level, solveResult)
~~~

Hàm tap runtime vẫn sở hữu life, coin, sao và progress snapshot. Nhưng phần
exit, switch và gate phải gọi transition pure; rotate cũng đi qua cùng
transition thay vì có một bản luật riêng.

### Toolchain decision

Chốt một đường chạy duy nhất, thay vì để generator tự viết lại logic vì không
import được TypeScript:

1. Migrate solver, validator, analyzer, generator và handcrafted source sang
   ESM TypeScript dưới **scripts/levels/**.
2. Đặt pure engine không phụ thuộc React/browser dưới
   **src/features/tribe-out/puzzle/**; runtime và scripts cùng import module này.
3. Thêm **tsx** là root devDependency, được lock trong **package-lock.json**;
   không gọi executable transitive của Vitest hoặc Vite.
4. Thêm **tsconfig.tools.json** cho scripts và chạy nó trong typecheck. Runtime
   typecheck và tools typecheck đều là quality gate.
5. Cung cấp chính thức bốn command:

~~~text
npm run levels:validate
npm run levels:solve
npm run levels:report
npm run levels:generate
~~~

Mỗi command phải chạy được từ clean checkout sau install, không import React,
DOM hay localStorage, và cùng dùng pure transition engine.

### File impact dự kiến

| File | Thay đổi dự kiến |
| --- | --- |
| **src/features/tribe-out/types.ts** | Thêm rotate charge theo level và các type action/state/validation dùng chung. |
| **src/features/tribe-out/gameLogic.ts** | Tách transition puzzle pure khỏi reward, life và progress wrapper. |
| **src/features/tribe-out/gameLogic.test.ts** | Test contract giữa runtime adapter và pure engine. |
| **src/features/tribe-out/levels.ts** | Giữ data runtime; level mới khai báo rotate charge explicit. |
| **src/features/tribe-out/tribeOutStorage.ts** | Migrate legacy progress sang versioned, stable-ID payload. |
| **src/features/tribe-out/tribeOutStorage.test.ts** | Test migration, sanitization, idempotence, clear và reward entitlement. |
| **src/features/tribe-out/TribeOutEntity.tsx** | Chỉ render live unit như control interactive/focusable. |
| **src/features/tribe-out/TribeOutGame.tsx** | Resolve progress theo catalog stable ID và chỉ dispatch action hợp lệ. |
| **scripts/levels/** | Validator, fast solver, stateful solver, analyzer, generator và authored source TypeScript. |
| **package.json**, **tsconfig.tools.json** | Script level, root TS runner và tools typecheck explicit. |

Metadata chỉ phục vụ authoring, như tier, intent, seed và target metrics, nên ở
manifest design. Runtime chỉ nhận field thực sự cần để chạy level.

## 5. Phase 0 — chốt contract và baseline

### Công việc

1. Viết fixture nhỏ cho từng rule trước khi thay solver.
2. Ghi rõ contract tại mục 3 vào test và comment, nhất là footprint, switch
   traversal và gate persistence.
3. Audit toàn bộ level bằng static checker.
4. Xuất baseline report tách cho 1–5 handcraft, 6–100 generated và từng
   mechanic.
5. Đánh dấu Level 5 invalid do overlap; không chấp nhận vì nó vẫn có thể giải.

### Acceptance

- Có fixture tái hiện overlap Level 5.
- Không còn claim toàn bộ 100 level đã verified nếu tool chưa chạy đủ 100.
- Tài liệu cũ nói 10 level được đánh dấu stale hoặc cập nhật sau khi data ổn.

## 6. Phase 1 — pure transition engine

### Công việc

1. Tách occupancy, forward path, exit evaluation và side effect switch/gate
   thành module pure gọi được từ browser lẫn CLI.
2. Định nghĩa PuzzleAction, PuzzleState, listLegalPuzzleActions và
   applyPuzzleAction.
3. Cấu hình rotate theo level:
   - trong migration, legacy default là 1 để không đổi hành vi âm thầm;
   - sau migration, mọi level mới khai báo explicit 0, 1 hoặc 2;
   - level không dạy hoặc không dùng rotate mặc định là 0.
4. Khi exit hợp lệ, transition phải atomically:
   - kiểm tra đường bằng occupancy state hiện tại;
   - mark unit escaped;
   - trace footprint cộng đường thoát;
   - activate mọi switch chưa kích hoạt bị đi qua;
   - mở toàn bộ gate target trong cùng transition.
5. Runtime wrapper giữ life/reward/UI feedback nhưng không nhân bản luật exit.
6. Khóa interaction ở hai lớp:
   - TribeOutEntity chỉ render live unit là button/focusable và chỉ unit gọi
     onTap;
   - applyTapUnit từ chối entity type khác unit trước canExit và không mất life;
   - applyRotateUnit từ chối entity type khác live unit trước khi tiêu charge.

### Test bắt buộc

- Unit 1x1 và multi-cell exit ở bốn hướng.
- Gate đóng chặn, gate mở không chặn.
- Một exit đi qua switch mở gate.
- Switch không kích hoạt khi exit bị chặn.
- Rotate đúng hướng, tiêu charge và không dùng được khi hết charge.
- Click, keyboard activation và direct domain call lên switch, gate hoặc obstacle
  không đổi life, charge hay puzzle state.
- Khi rotate tool được chọn, non-unit không được tiêu charge; blocked live unit
  vẫn giữ đúng bump/life rule.
- Switch, gate và obstacle không có button role, tab stop hoặc onTap dispatch.
- Cùng action cho cùng entity state ở pure engine và runtime adapter.

### Acceptance

- Không có logic occupancy, switch hoặc gate độc lập ngoài pure engine.
- Test rule pass trước khi đổi level data hoặc generator.

## 7. Phase 2 — validator và state-space solver

### 7.1. Static validator

Validator phải fail bằng mã lỗi và context rõ ràng, không chỉ trả false.

| Nhóm | Kiểm tra tối thiểu |
| --- | --- |
| Identity | Level ID và entity ID unique. |
| Geometry | Row, col, width, height là integer hợp lệ; footprint nằm trong board. |
| Occupancy | Không chồng footprint vật lý ban đầu; báo đủ entity và cell xung đột. |
| Entity contract | Unit có direction; gate có open; switch có targetId và activated. |
| Link | Switch target tồn tại và là gate. |
| Level config | Rotate charges không âm, là integer; legacy default có warning rõ. |
| Authoring | Nếu có manifest, seed, intent và tier khớp level ID. |
| Interaction | Type-specific fields required/forbidden rõ ràng; chỉ live unit có thể là tap/rotate target. |

Validator không cấm obstacle trên đường thoát nói chung: đó có thể là ý đồ để
rotate có ý nghĩa. Nó chỉ cấm data sai; solver quyết định có lời giải hay không.

### 7.2. Solver hai đường

Không dùng BFS thuần trên escaped mask cho mọi level. Với nhiều unit độc lập,
canonical state vẫn có thể tạo gần 2 mũ N subset và không thể đạt Definition of
Done bằng cách chỉ tăng budget.

#### Fast path: monotonic worklist

Áp dụng khi solver tìm được lời giải không cần Rotate. Các exit hiện có của v1
chỉ loại occupancy hoặc mở gate; chúng không làm một exit hợp lệ trước đó trở
nên không hợp lệ. Switch/gate one-way vẫn thuộc fast path vì side effect chỉ mở
thêm lựa chọn.

1. Chạy deterministic worklist chỉ với Exit.
2. Mỗi lần lấy một exit hợp lệ, áp dụng pure transition rồi chỉ cập nhật
   availability cần thiết hoặc recompute theo board budget.
3. Nếu mọi unit escaped, trả SOLVABLE với minRotateRequired bằng 0 và một
   representative trace.
4. Nếu worklist cạn:
   - không còn rotate charge: trả UNSOLVABLE;
   - còn rotate charge: chuyển sang stateful path.

Fast path không enumerate các hoán vị exit commute. Nó phải giải fixture 40 unit
độc lập trong budget nhỏ, với trace deterministic và không tiến gần 2 mũ 40
state.

#### Stateful path: lexicographic Dijkstra với partial-order reduction

Chỉ dùng khi cần xét Rotate hoặc mechanic tương lai có thể làm các exit không
còn monotonic. Canonical state là:

~~~text
key = escaped mask
    + direction bits cho unit chưa escaped
    + gate-open mask
    + switch-activated mask
    + rotate charges remaining
~~~

Cost là tuple so sánh theo thứ tự từ điển:

~~~text
cost = (rotateCount, totalActionCount)
~~~

Vì vậy 0 rotate và 12 action luôn thắng 1 rotate và 9 action. Dijkstra phải
lưu parent action để trả trace replay được.

Giảm state-space bắt buộc:

1. Dùng partial-order reduction có test, ví dụ sleep-set hoặc ample-set.
   Hai Exit chỉ được xem commute khi cả hai thứ tự đều legal và cho cùng
   canonical state; chỉ giảm symmetry đã được chứng minh, không bỏ branch
   non-commuting.
2. Dominance pruning: với cùng escaped, directions, gate và switch state, một
   entry có cost không tốt hơn hoặc ít rotate charge hơn entry đã biết không
   được expand.
3. Action ordering, representative của commute class và priority queue phải
   deterministic.
4. Hard state/time budget trả INCONCLUSIVE kèm diagnostics: frontier, state
   key distribution, action classes và fixture/template gây nổ.

INCONCLUSIVE là publish blocker cho level phát hành. Definition of Done chỉ yêu
cầu corpus phát hành nằm trong budget đã công bố; không hứa mọi input tùy ý sẽ
có kết quả xác định.

Yêu cầu chung cho cả hai đường:

1. Exit chỉ sinh cho live unit có thể exit ở current state.
2. Rotate chỉ sinh cho live unit khi còn charge.
3. Mọi successor được tạo bằng applyPuzzleAction, không reimplement geometry.
4. Kết quả chỉ là SOLVABLE, UNSOLVABLE hoặc INCONCLUSIVE.
5. Report explored state, queue peak, elapsed time, route đã chọn và solver
   path được dùng.

### 7.3. Test solver

- DAG đơn giản có solution.
- DAG bị khóa vĩnh viễn là UNSOLVABLE.
- Gate/switch một tầng và chuỗi gate/switch.
- Level chỉ giải được sau một rotate.
- Rotate hợp lệ nhưng dùng sai dẫn tới dead end.
- Hai solution cạnh tranh: 0 rotate, 12 action phải được chọn thay vì 1 rotate,
  9 action.
- 40 unit độc lập là SOLVABLE qua fast path trong budget nhỏ, không enumerate
  subset escaped.
- Overlap Level 5 fail trước khi solver chạy.
- Budget nhỏ trả INCONCLUSIVE, không trả SOLVABLE.
- Representative solution replay đến thắng bằng transition engine.

### Acceptance

- Toàn bộ level committed là VALID và SOLVABLE.
- CLI chạy đủ range được yêu cầu, không còn special case level 22.
- Không có trace thắng nhờ state mutation ngoài transition engine.

## 8. Phase 3 — difficulty analyzer và report

Analyzer phải tách visual density khỏi logical depth. Report ghi rõ cách đo,
sample strategy và version tool.

| Metric | Cách đo | Dùng để quyết định |
| --- | --- | --- |
| initialAvailableMoves | Số Exit hợp lệ ở state đầu; không tính rotate. | Cổng vào level quá mở hay quá bó. |
| initialAvailableRatio | Initial exits chia tổng unit. | Phát hiện level đông nhưng logic nông. |
| criticalPathLength | Longest path của dependency DAG ở level không stateful. | Đo depth thuần. |
| causalUnlockDepth | Số decision layer tuần tự tối thiểu sau khi collapse exit commute. | Đo depth cho DAG lẫn gate/switch/rotate. |
| averageAvailableMoves | Trung bình số Exit ở winning-reachable state; sample phải deterministic nếu dùng. | Đo độ mở trong lúc giải. |
| forcedStateRatio | Tỷ lệ winning-reachable state có đúng một Exit hợp lệ. | Đo mức forced sequence. |
| minRotateRequired | Ít nhất bao nhiêu rotate trên mọi solution. | Biết rotate optional hay bắt buộc. |
| deadEndRisk | Tỷ lệ action hợp lệ từ winning-reachable state đi tới state không còn đường thắng. | Kiểm soát consequence. |
| meaningfulDecisionProxy | Collapse action commute: A/B commute khi A->B và B->A đều legal và cho cùng canonical state. | Không xem thứ tự tương đương là chiến lược khác nhau. |
| mechanicUsage | Số obstacle, gate, switch và multi-cell tham gia một ràng buộc hoặc transition trong solution graph. | Loại visual filler. |

MeaningfulDecisionProxy là proxy minh bạch, không phải số lời giải chính xác.

Analyzer cũng không được enumerate mọi escaped subset chỉ để lấy trung bình:

- Với monotonic level, averageAvailableMoves và forcedStateRatio lấy trên
  canonical exit-wave trace cộng một số topological trace seeded, cố định; report
  phải ghi sample count và coverage là sampled.
- Với stateful level, dùng state graph đã được partial-order reduced hoặc các
  solver trace bounded. Chỉ gắn nhãn exact khi toàn bộ relevant graph đã được
  duyệt trong budget.
- deadEndRisk của monotonic fast path là 0 theo contract. Với stateful level,
  report exact hoặc sampled kèm coverage; không ngụy trang estimate thành fact.
- Fixture 40 unit độc lập phải tạo report mà không enumerate 2 mũ 40 state.

### Cách tính causalUnlockDepth

Metric này thay cho minSolutionExitDepth. Số Exit trong bất kỳ lời giải thắng
nào cũng bằng tổng số unit, nên nó không nói được gì về dependency depth.

Một decision layer là một macro-step:

1. Nó chứa một tập Exit đang legal ở đầu layer và pairwise commute. Chúng có thể
   được thực hiện theo bất kỳ thứ tự canonical nào trong cùng layer.
2. Exit chỉ trở thành legal sau blocker bị xóa hoặc gate được mở thì thuộc layer
   kế tiếp, không được kéo ngược vào layer hiện tại.
3. Một Rotate bắt buộc là layer riêng; exit chỉ được rotate mở ra bắt đầu ở layer
   sau. Điều này phản ánh một quyết định dùng resource thật.
4. Với stateful level, macro-step search tìm min layer count với cost
   lexicographic: rotate count, decision layer count, total action count.
   Nó dùng cùng commutativity proof và budget diagnostics như stateful solver.
5. Với monotonic fast path, repeatedly execute toàn bộ exit wave legal hiện tại.
   Vì exit chỉ mở thêm lựa chọn, số wave này chính là causalUnlockDepth tối thiểu.

Regression fixture bắt buộc:

~~~text
8 unit độc lập              => causalUnlockDepth = 1
chuỗi dependency 8 unit     => causalUnlockDepth = 8
2 nhánh độc lập dài 4       => causalUnlockDepth = 4
rotate bắt buộc rồi 1 exit  => causalUnlockDepth = 2
switch -> gate -> unit      => tạo ít nhất một layer causal mới
~~~

### Output bắt buộc

- Markdown hoặc CSV cho người đọc và JSON cho CI.
- Summary cho 1–5, 6–20, 21–40, 41–60, 61–80 và 81–100.
- Danh sách level invalid, unsolvable, inconclusive và lệch target.
- Representative trace cho mọi failed/outlier level.

## 9. Difficulty targets

Các dải là target authoring ban đầu, không thay thế playtest. Start exits và
average exits luôn chỉ tính action Exit.

| Tier | Unit | Start exits | Initial ratio | Critical path / causal depth | Average exits | Rotate | Quyết định thật |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Tutorial | 1–5 | 1–3 | Theo lesson | 1–3 | 1–3 | 0–1, có hướng dẫn | 0 |
| Easy | 4–7 | 2–4 | 35–55% | 2–4 | 2–4 | 0 | 0–1 |
| Medium | 6–9 | 1–3 | 20–35% | 4–6 | 2–3 | 0–1 | 1–2 |
| Hard | 8–12 | 1–2 | 10–25% | 6–9 | 1–3 | 1 | 2–4 |
| Expert | 10–14 | 1–3 | 10–25% | 8–12 | 1–3 | 1–2 | 3–6 |

Level DAG thuần dùng criticalPathLength; level có gate, switch hoặc rotate dùng
causalUnlockDepth. Một level có deadEndRisk lớn hơn 0 chỉ được chấp nhận khi
consequence có signal và recovery rõ ràng.

## 10. Phase 3.5 — migration progress trước curated rollout

Re-author Level 1–30 là thay puzzle content, không chỉ sửa presentation. Progress
hiện lưu star theo array index và dùng star làm gate reward, nên không thể giữ
nguyên schema cũ.

### Policy đã chọn: giữ progression và economy, reset score content đã thay

- Giữ coin và unlock của người chơi.
- Giữ quyền first-clear reward đã claim; không mint coin lại khi một slot được
  re-author.
- Reset stars của Level 1–30 vì chúng thuộc puzzle cũ; player có thể lấy sao cho
  content mới.
- Stars của content không thay đổi được giữ lại.
- Current level luôn resolve về slot hợp lệ và đã unlock trong catalog mới.

Thay bốn localStorage key rời bằng canonical payload versioned:

~~~text
schemaVersion
levelSetVersion
coins
unlockedSlotIds
currentSlotId
starsByContentId
rewardClaimedSlotIds
~~~

Mỗi level có:

- slotId ổn định cho vị trí progression, ví dụ l12;
- contentId đổi khi logic của slot thay đáng kể, ví dụ logic-v2-l12;
- reward entitlement key theo slotId, không theo star hoặc contentId.

Runtime resolve slotId sang index của catalog hiện tại khi build game state. Nhờ
đó insert hoặc reorder catalog không làm current level, stars hoặc reward tự
nhiên gắn sang puzzle khác.

### Migration legacy sang v2

1. Chạy một lần, idempotent, trước khi load state gameplay.
2. Giữ coins nguyên vẹn.
3. Convert legacy highest/current index sang unlockedSlotIds và currentSlotId,
   clamp theo catalog mới. Current fallback về slot đã unlock gần nhất hoặc slot
   đầu nếu data corrupt.
4. Với mỗi legacy star lớn hơn 0, seed rewardClaimedSlotIds của slot tương ứng.
5. Reset stars cho changed slots 1–30; map sao còn lại sang contentId hiện tại.
6. Persist canonical payload thành công rồi mới coi legacy keys là fallback cũ.
   Clear progress phải xóa canonical payload lẫn toàn bộ key legacy, gồm stars.
7. Reward tính và persist ở terminal completion từ rewardClaimedSlotIds. Replay
   coin delta bằng 0 theo policy; không thưởng từng unit rồi chỉ chặn bonus cuối.

### Regression tests

- Legacy snapshot có coin, highest/current, stars trong và ngoài range 1–30:
  coin giữ nguyên, range an toàn, star changed reset, star unchanged giữ đúng.
- Legacy player đã clear slot re-authored: star mới trống nhưng reward claim vẫn
  tồn tại; clear content mới không mint first-clear coin lần nữa.
- Legacy player chưa clear slot: clear content mới nhận đúng một reward.
- Replay level nhiều unit sau claim có coin delta bằng 0.
- Migration chạy hai lần không reset sao mới, không đổi coin/claim.
- Corrupt JSON, negative/huge index và current vượt unlock không crash.
- Insert/reorder fixture vẫn map stars, claims và current theo slotId/contentId.
- Clear progress xóa stars và claim thật sự, không để localStorage cũ ảnh hưởng
  replay.

### Acceptance

- Migration được test trước khi Level 1–30 mới được publish.
- Không mất coin/unlock ngoài policy, không double reward, không farm replay.
- Progress payload có schema/version và stable mapping, không dùng array index
  làm identity lâu dài.

## 11. Phase 4 — re-author 20–30 level đầu

Không thay toàn bộ 100 level cùng lúc. Dựng curated progression trước để nó trở
thành chuẩn chất lượng cho generator.

| Range | Mục tiêu |
| --- | --- |
| 1–5 | Exit, blocker, rotate bắt buộc, switch/gate, multi-cell không overlap. |
| 6–10 | DAG cơ bản: chain ngắn, fork/join, 2–4 action đầu rõ ràng. |
| 11–15 | Multi-cell là structure: một unit mở hai lane hoặc che footprint rộng. |
| 16–20 | Rotate là resource: level thường 0 charge, lesson/strategic level explicit 1. |
| 21–25 | Gate/switch một chiều và state chain ngắn, không toggle. |
| 26–30 | Kết hợp multi-cell với rotate hoặc gate; có decision thật nhưng vẫn đọc được trên mobile. |

Mỗi handcrafted level có manifest:

~~~text
id
tier
concepts introduced/reinforced
intended opening
known solution trace
target metric ranges
whether rotate is required
whether a dead end is intentional and how it is signaled
~~~

Level 5 phải được thiết kế lại trước khi dùng làm lesson multi-cell. Không sửa
render hoặc z-order để che overlap.

### Acceptance

- 20–30 level đầu có manifest và solver trace.
- Không level nào chỉ khó vì số unit cao.
- Rotate, gate/switch xuất hiện lại sau tutorial như mechanic thật.

## 12. Phase 5 — constrained generator

Generator mới không bắt đầu bằng rải unit rồi hy vọng có dependency. Pipeline:

1. Chọn tier, board budget, mechanic template và target metrics.
2. Sinh dependency blueprint trước: spine, fork, join, số root và chain depth.
3. Embed blueprint theo reverse topological order để entity đặt sau chặn đúng
   lane của entity trước.
4. Đặt multi-cell theo role rõ ràng, không theo tỷ lệ random đơn thuần.
5. Đặt obstacle chỉ khi analyzer chứng minh nó ảnh hưởng exit hoặc rotate route.
6. Với gate/switch, sinh causal chain explicit và giữ gate one-way.
7. Chạy static validator, solver và analyzer trên candidate.
8. Chỉ accept candidate khi valid, solvable, không inconclusive và trong target
   band; nếu fail, retry bằng seed deterministic.
9. Lưu seed, template và report summary để tái tạo level.

Generator không được silently giảm số unit sau khi hết attempts rồi vẫn gắn cùng
difficulty tier. Failure phải được report để author chỉnh template hoặc board
budget.

### Acceptance

- Cùng seed cộng version tạo cùng level data.
- Mỗi generated level có metric report và solution trace.
- Generated range chỉ bắt đầu sau curated range được chấp nhận.
- Không hard-code exception theo ID trong generator hoặc solver.

## 13. Phase 6 — timer, UX và balancing cuối

Chỉ chỉnh timer sau khi logic curve pass.

~~~text
time budget =
  observation allowance
  + expected exits x animation/input time
  + mobile buffer
~~~

- Timer không được là cách duy nhất biến easy thành hard.
- Nếu timer chỉ ảnh hưởng sao, HUD và mô tả level phản ánh đúng điều đó.
- Rotate charge, switch activation và gate open phải có feedback nhìn thấy được.
- Hint dùng listLegalPuzzleActions hoặc solver trace phù hợp, không dựa helper
  cũ dễ drift.
- Playtest mobile level footprint lớn, gate chain và choice có consequence để
  xác nhận khó vì reasoning, không phải tap ambiguity.

## 14. Quality gates và QA

### Script và CI dự kiến

~~~text
npm run typecheck
npm test
npm run build
npm run levels:validate
npm run levels:solve
npm run levels:report
npm run levels:generate
~~~

Gate merge:

1. Không có level INVALID, UNSOLVABLE hoặc INCONCLUSIVE.
2. Report lệch target được review như thay đổi design, không bị che bởi regen.
3. Mọi level mới/sửa có fixture hoặc solution trace.
4. Typecheck bao gồm runtime và scripts/levels qua tsconfig.tools.json.
5. Clean checkout có thể install rồi chạy validate, solve, report và generate
   bằng root scripts, không dựa executable transitive.
6. Build và runtime unit test vẫn pass.

### Manual QA tối thiểu

- Rotate lesson: không xoay thì không exit; xoay đúng tiêu một charge.
- Gate lesson: switch trên đường đi mở gate và gate giữ open.
- Switch/gate/obstacle không nhận focus hoặc puzzle action; keyboard và rotate
  tool trên chúng không trừ life/charge.
- Multi-cell: không có click target hoặc z-order lẫn do overlap.
- Rotate strategic: dùng charge sai có outcome đã thiết kế và restart rõ.
- Hard/expert: choice đọc được trên mobile, không cần đoán pixel/occupancy ẩn.
- Replay trace solver trong runtime.

## 15. Rollout và rollback

1. Commit theo phase: pure engine, solver/validator, report, progress migration,
   curated data, generator, rồi timer. Không gộp tất cả vào một patch.
2. Ship schema migration trước hoặc cùng curated data. Rollback catalog phải
   tương thích levelSetVersion và canonical progress payload; không quay về đọc
   index legacy một cách mù.
3. Giữ snapshot data trước khi re-author và test downgrade/read fallback trước
   khi xóa key legacy.
4. Generator ghi output tạm, validate/report đầy đủ rồi mới promote.
5. Khi search quá budget, trả INCONCLUSIVE và giảm scope/optimize state key;
   không tắt validation.
6. Nếu consequence gây frustration, giảm deadEndRisk hoặc thêm signal/recovery,
   không chỉ tăng life hay ép timer.

## 16. Definition of done

- Có pure transition engine dùng chung cho runtime và tools.
- Validator bắt được overlap Level 5, out-of-bounds và link gate/switch sai.
- Fast path giải level monotonic mà không enumerate hoán vị exit; stateful path
  dùng lexicographic Dijkstra, partial-order reduction và dominance pruning.
- Solver chạy toàn bộ range phát hành với kết quả xác định cho từng level trong
  budget công bố.
- Difficulty report có metrics mục 8 và tái tạo deterministic.
- CausalUnlockDepth phân biệt fixture độc lập, chain, branch, rotate và
  switch/gate theo regression test đã nêu.
- Migration progress idempotent: coin/unlock không mất, star changed content
  reset đúng policy, first-clear/replay không farm coin.
- Chỉ live unit có thể dispatch tap/rotate; environmental entity không làm đổi
  life hoặc charge.
- Toolchain TypeScript chạy được từ clean checkout và scripts được typecheck.
- Ít nhất 20–30 level đầu được handcraft theo progression mục 11.
- Rotate, gate/switch và multi-cell đều là mechanic thật, không chỉ tutorial
  hoặc visual clutter.
- Generator chỉ accept candidate qua validator, solver và metric target.
- Timer được chỉnh sau cùng theo puzzle curve.
- Typecheck, test, build và script level mới đều pass.

## 17. Thứ tự thực hiện đề xuất

1. Phase 0: contract, fixture và baseline.
2. Phase 1: pure transition engine.
3. Phase 2: validator và state-space solver.
4. Phase 3: difficulty report.
5. Phase 3.5: migrate progress trước curated rollout.
6. Phase 4: sửa Level 5 và handcraft 20–30 level đầu.
7. Phase 5: constrained generator cho phần còn lại.
8. Phase 6: playtest, timer và UX polish.

Không thêm mechanic mới trước Phase 2. ROI cao nhất là solver và analyzer đúng,
để mọi thay đổi level sau đó được đo bằng puzzle depth thay vì cảm giác chủ quan.

## 18. Evidence protocol cho mỗi phase

Mọi kết luận completion phải kèm evidence có thể audit:

1. Record branch, HEAD commit và full git status trước/sau thay đổi.
2. Đưa diff stat và raw diff của file đổi; với file untracked dùng diff
   no-index so với empty file, không chỉ in status của riêng path đó.
3. Khi worktree đã bẩn, liệt kê baseline entries ngoài scope và chứng minh patch
   chỉ chạm target đã nêu.
4. Report tool phải ghi catalog version, seed/template, command, runtime và
   summary result.
5. Nếu repomix loại trừ Markdown, audit bundle phải đính raw Logic.md diff hoặc
   explicit include file này; không coi snapshot thiếu file là proof không đổi.
