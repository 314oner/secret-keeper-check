env-crypto-deploy-check
Проверка шифрования переменных окружения при деплое
Надёжный способ убедиться, что ваши секреты доходят до продакшена без утечек.

Live demo: https://314oner.github.io/env-crypto-deploy-check/

Features
🔐 Шифрование .env.production с помощью @dotenvx/dotenvx

🧪 Расшифровка в GitHub Actions через Repository Secret (DOTENV_PRIVATE_KEY_PRODUCTION)

📡 Два HTTP-клиента: публичный (без withCredentials) и приватный (с куками)

🖥️ Логирование всех переменных VITE_* в консоли браузера – всегда видно, какие значения подставлены

⚡ TypeScript typecheck на CI, сборка и деплой на GitHub Pages

💾 Кэширование зависимостей для экономии минут GitHub Actions

🌐 BrowserRouter – роутинг в React

Tech stack
Build: Vite 5

Framework: React 18

Language: TypeScript 5 (strict)

HTTP client: Axios

Environment encryption: dotenvx

CI/CD: GitHub Actions (typecheck, build, deploy to GitHub Pages)

Package manager: Yarn 4

Local development
Требуется Node 20+ (см. .nvmrc).

bash
yarn install
yarn dev                # http://localhost:5173
Другие скрипты:

bash
yarn frontend:build     # production-сборка (без расшифровки, используйте preview)
yarn preview            # предпросмотр продакшен-сборки с расшифровкой .env.production
yarn typecheck          # tsc --noEmit
yarn env:encrypt        # зашифровать .env.production
yarn env:decrypt        # расшифровать .env.production (локально, если есть приватный ключ)
Project structure
text
src/
├── shared/api/
│   ├── config/
│   │   ├── api.ts             # API_VERSION, STAGE, API_URL, логирование VITE_*
│   │   ├── service-path.ts    # определение API_URL (DEV ? "" : VITE_BACKEND_URL)
│   │   └── current-stage.ts   # STAGE = VITE_MODE_ENV
│   ├── publicClient.ts        # axios без credentials (публичные запросы)
│   ├── privateClient.ts       # axios с credentials (авторизованные запросы)
│   ├── auth-api.ts            # методы: getYandexAuthUrl, exchangeCode, getCurrentUser, logout
│   └── user-api.ts            # методы: updateProfile, deleteAccount, getUserById, getMyBids, …
├── hooks/
│   └── useAuth.ts             # хук для получения/обновления пользователя
├── views/
│   ├── sign-in/               # страница входа (демонстрирует public + private запросы)
│   └── profile/               # страница профиля (кнопки для вызова API)
├── app/
│   ├── layouts/header.tsx
│   └── routes/private-route.tsx
├── App.tsx
└── main.tsx                   # точка входа с BrowserRouter
How encryption works
Локально создаётся .env.production с реальными значениями.

Запуск yarn env:encrypt шифрует файл, генерируя публичный и приватный ключи.

Приватный ключ (начинается с priv_...) сохраняется в Repository Secret (DOTENV_PRIVATE_KEY_PRODUCTION) на GitHub.

В GitHub Actions шаг сборки использует dotenvx run -f .env.production -- yarn frontend:build, что автоматически расшифровывает переменные в рантайме.

В браузере (в режиме production) в консоли отображаются расшифрованные значения, что подтверждает корректность подстановки.

CI/CD pipelines
Два воркфлоу в .github/workflows:

ci.yml – запускается на каждый PR и push в не‑main ветки. Выполняет tsc --noEmit (typecheck). Использует кэш Yarn для скорости.

deploy.yml – запускается только при пуше в main. Выполняет typecheck, сборку с расшифровкой и деплой на GitHub Pages.

Environment files
.env.example – шаблон для разработки (не зашифрован).

.env.production – зашифрованный файл (хранится в репозитории, но без приватного ключа не читается).

.env.production.public – публичный ключ для шифрования (не секретный).

.env.production.keys – содержит публичный и приватный ключи (не коммитится, только локально).

License
MIT – делайте с этим кодом всё, что захотите.