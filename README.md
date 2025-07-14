# 📦 React Native + Expo + Supabase Starter

A minimal yet powerful starter to quickly launch a mobile app using Expo and Supabase, including:

-   🔐 Authentication (sign up / sign in)

-   ⚛️ React authentication context

-   💅 Clear and extensible structure

-   📱 Android / iOS / Web compatible

## 🚀 Getting Started

```bash
git clone https://github.com/your-user/your-starter.git
cd your-starter
npm install
npx expo start
```

---

## 🧠 Features

-   ✅ Supabase Auth (login, signup, auto-refresh)

-   🧭 React Navigation for screen transitions

-   ⚙️ Global Auth Context (AuthProvider)

-   🧱 Simple and modular project structure

-   ✨ TypeScript with strict mode enabled

---

## 🗂️ Project Structure

```
.
├── app/
│ ├── (auth)/ # Login / Signup screens
│ ├── (app)/ # Protected app area
│ └── \_layout.tsx # Navigation layout management
├── components/ # Shared UI components
├── context/AuthProvider # Global auth context
├── utils/supabase.ts # Supabase client instance
├── tsconfig.json
└── ...
```

---

## 🔑 Supabase Setup

1. Create a project on supabase.com

2. Go to Project Settings > API

3. Copy your anon key and project URL

4. Create a .env file at the root:

```ini
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

5. Make sure your Supabase client uses these environment variables.

---

## 📄 Scripts

```bash
npm run start # Start the app with Expo
npm run lint # Lint the codebase
npm run build # (optional, if needed)
```

---

## 🧑‍💻 Author

Made with ❤️ by @vandevelde-dimitri
