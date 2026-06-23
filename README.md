# 帳號管理系統 ｜ 水星前端 Vue 面試專案

以 **Vue 3 + Vite + TypeScript + Tailwind CSS + Pinia** 完成的小型帳號管理系統，包含身份驗證登入與帳號 CRUD，並依設計稿還原 UI。

> 設計稿：<https://server-door-49461275.figma.site/>
> API 文件：<https://api-frontend-interview-server.metcfire.com.tw/api-docs>

---

## 一、快速啟動

```bash
# 1. 安裝相依套件
npm install

# 2. 設定環境變數（複製範本後填入你的英文名）
cp .env.example .env

# 3. 啟動開發伺服器（http://localhost:5173）
npm run dev

# 4. 型別檢查 + production build
npm run build

# 5. 預覽 build 結果
npm run preview
```

### 環境變數（`.env`）

| 變數 | 說明 |
| --- | --- |
| `VITE_API_BASE_URL` | API Base URL，預設指向面試測試環境 |
| `VITE_INTERVIEWER_NAME` | **必填**，API 以此 `interviewerName` 標頭辨識身份。請改成你的英文名（預設佔位 `YOUR_ENGLISH_NAME`） |
| `VITE_USE_MOCK` | `true` 時使用內建假資料（離線可完整展示流程）；`false` 時串接真實 API |

> 專案預設 `VITE_USE_MOCK=false`（串接真實 API）。**請務必把 `VITE_INTERVIEWER_NAME` 改成你的英文名**，否則 API 無法辨識身份。想離線示範時把 `VITE_USE_MOCK` 改為 `true` 即可。

---

## 二、運作流程

```
┌──────────────┐   輸入 email / password    ┌──────────────────┐
│  LoginView   │ ─────────────────────────▶ │  authStore.login   │
└──────────────┘                            └────────┬─────────┘
        ▲                                            │ authApi.login()（純前端 session）
        │ 路由守衛攔截未登入                          ▼
        │                                   ┌──────────────────┐
        │                                   │   tokenStorage     │ 依「記住我」存入
        │                                   │  local/session     │ localStorage / sessionStorage
        │                                   └────────┬─────────┘
        │ replace('/accounts')                        │
        └─────────────────────────────────────────────┘
                          │
                          ▼
┌──────────────────────────────────────────────────────────┐
│                       AccountsView                          │
│  搜尋(debounce) → accountStore.keyword → filtered(getter)   │
│  新增/編輯/刪除 → accountStore actions → accountApi → 重抓清單 │
│  統計卡 total / active(ON) / inactive(OFF) 由 stats(getter) 計算 │
└──────────────────────────────────────────────────────────┘

真實 API 無 auth 端點，身份識別只靠標頭。每個帳號請求皆經 axios 攔截器：
  request  → 自動加上 interviewerName 標頭（後端據此分隔每位面試者的資料）
  response → 統一錯誤訊息正規化（resolveMessage）
```

---

## 三、專案結構

```
src/
├── api/                 API 合約層（單一事實來源）
│   ├── http.ts          axios 實例 + interviewerName 攔截器 + 錯誤正規化
│   ├── auth.ts          純前端 session 登入（無後端 auth 端點）
│   ├── account.ts       帳號 CRUD；對齊真實端點 + 回應防禦式正規化
│   └── mock.ts          VITE_USE_MOCK 時的本地假資料 adapter
├── stores/              Pinia（setup store）
│   ├── auth.ts          token / user / login / logout
│   └── account.ts       list（單一來源）+ stats/filtered getters + CRUD
├── composables/
│   ├── useDebounce.ts   搜尋防抖
│   └── useApiState.ts   loading / error 統一包裝
├── types/
│   ├── enums.ts         RoleLevel / AccountStatus + 顯示文字對應
│   ├── auth.ts          LoginPayload / AuthResult ...
│   └── account.ts       Account / AccountPayload / AccountStats
├── components/
│   ├── base/            BaseInput / BaseSelect / BaseModal / ConfirmDialog
│   │                    BaseButton / BaseBadge / BaseIcon（皆用 defineModel）
│   ├── auth/            LoginForm
│   └── account/         AccountStats / AccountSearchBar / AccountCard
│                        AccountList / AccountFormModal
├── views/               LoginView / AccountsView
├── router/              路由 + 登入守衛
├── constants/           STORAGE_KEYS / RouteName / API_ENDPOINTS
└── utils/               tokenStorage（token 持久化）
```

---

## 四、設計重點對應評分

| 項目 | 實作 |
| --- | --- |
| Composition API | 全專案 `<script setup>`；邏輯抽至 composables |
| 元件拆分 / props·emit | 展示型元件（AccountCard/Stats）純 props/emit，view 負責組合與資料流 |
| UI 與邏輯分離 | view 呼叫 store、元件不直接碰 API |
| TypeScript | interface / enum / 泛型元件（BaseSelect）完整標註，`vue-tsc` 零錯誤 |
| 工程化 | `.env`、清楚資料夾分層、Vite + alias `@` |
| Pinia | `list` 單一來源，`stats`/`filtered` 以 getter 計算避免重複 state |
| API 串接 | axios 封裝 + 請求/回應攔截器、interviewerName 標頭、錯誤訊息正規化 |
| 錯誤 / Loading UX | `useApiState` 統一 loading/error；按鈕 spinner、清單 skeleton、錯誤提示 |
| RWD + Tailwind | mobile-first；卡片手機單欄、桌面 `md/xl` 多欄 grid |
| defineModel（加分） | BaseInput / BaseSelect / BaseModal / ConfirmDialog / SearchBar 雙向綁定 |
| 防呆（加分） | email 格式驗證、必填驗證、刪除採自製確認彈窗（非原生 confirm） |

---

## 五、API 規格（依 Swagger 實作）

> 文件：<https://api-frontend-interview-server.metcfire.com.tw/api-docs>

**身份識別**：API 無 login / token / refresh 端點，登入頁為純前端 gate（符合考題「執行函式成功登入並切換路由即可」）。真正的身份識別只靠每個請求帶上的 `interviewerName` 標頭，後端據此分隔每位面試者的資料（新名稱初始清單為空）。

**端點對照**（集中於 `src/constants/index.ts` 的 `API_ENDPOINTS`，於 `src/api/account.ts` 串接）：

| 功能 | Method | 路徑 |
| --- | --- | --- |
| 取得清單 | GET | `/accounts`（支援 `?name=&email=` 查詢） |
| 取得單筆 | GET | `/account/{id}` |
| 新增 | POST | `/create-account` |
| 更新 | PATCH | `/update-account/{id}` |
| 刪除 | DELETE | `/delete-account/{id}` |

**Enum 合法值**（`src/types/enums.ts`，照 Swagger）：
- `RoleLevel`：`ADMIN` / `EDITOR` / `USER` / `CLIENT`（顯示：管理員 / 編輯 / 用戶 / 客戶）
- `AccountStatus`：`ON` / `OFF`（顯示：啟用 / 停用）

**請求 Body（`AccountFormDto`，create / update 共用，皆必填）**：
```json
{ "name": "string", "email": "string", "roleLevel": "ADMIN", "status": "ON" }
```

**資料一致性**：新增/更新/刪除後一律重新 `GET /accounts`，以伺服器資料為準（避免依賴回應的不確定欄位）。回應正規化（`normalizeAccount`）對 `id`/`_id`、`createdAt` 容缺做防禦式處理。

> 切換離線示範：將 `.env` 的 `VITE_USE_MOCK` 設為 `true`，即用內建 3 筆假資料展示同一套 UI 與流程。

---

## 六、技術堆疊

Vue 3.5 ｜ Vite 6 ｜ TypeScript 5.7 ｜ Tailwind CSS 3.4 ｜ Pinia 2 ｜ Vue Router 4 ｜ axios 1.7
