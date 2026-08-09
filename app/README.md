# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## AI Configuration (Development)

Basirah's AI analysis feature currently uses **Gemini** as the AI provider for development and testing.

### Setup

1. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).
2. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
3. Fill in your key:
   ```
   EXPO_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. (Optional) Override the default model:
   ```
   EXPO_PUBLIC_GEMINI_MODEL=gemini-2.0-flash
   ```
5. Restart the Expo dev server (`npx expo start -c`) so the new env vars are loaded.

### ⚠️ Security Note

`EXPO_PUBLIC_*` variables are **embedded in the client bundle** and are visible to anyone who inspects the app. This setup is for **development only** and must be replaced by a secure backend/API layer before production.

- Never commit real keys. `.env` and `.env*.local` are gitignored.
- The key is read at runtime from the environment — it is never hardcoded in source.

### Architecture

The app talks to AI only through `src/services/ai/aiService.ts`. The Gemini-specific implementation lives **only** in `src/services/ai/aiProvider.ts`. To replace Gemini with another provider (e.g. an n8n Agent workflow) later, only `aiProvider.ts` needs to change — the rest of the app is provider-agnostic.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
