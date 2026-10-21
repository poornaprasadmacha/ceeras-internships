# Cloudflare Pages Deployment Guide — Learn by Ceeras

This project is fully optimized and configured for instantaneous, zero-configuration deployment to **Cloudflare Pages**.

---

## 1. Cloudflare Pages Optimization Architecture

The application includes native Cloudflare Pages configuration files in `public/` (which Vite copies to `dist/` upon build):

1. **SPA Client-Side Routing (`public/_redirects`)**:
   ```
   /*    /index.html   200
   ```
   Ensures deep links and browser refreshes on routes like `/learn`, `/practice`, `/quizzes`, `/progress`, and `/settings` are routed to `index.html` with an HTTP 200 status code, preventing Cloudflare 404 errors.

2. **WebAssembly & Security Headers (`public/_headers`)**:
   ```
   /*.wasm
     Content-Type: application/wasm
     Cache-Control: public, max-age=31536000, immutable
   ```
   Forces Cloudflare's edge CDN to serve SQLite WebAssembly binaries (`sql-wasm.wasm`, `sql-wasm-browser.wasm`) with the exact `application/wasm` MIME type, enabling native browser `WebAssembly.instantiateStreaming`.

3. **Node.js Environment Specification (`.node-version`)**:
   Specifies Node.js `20.18.0` LTS to ensure Cloudflare Pages build runners use modern Node.js for Vite 6 and TypeScript 5 compilation.

4. **Wrangler Configuration (`wrangler.toml`)**:
   Specifies the project name, output directory (`dist`), and compatibility date for Cloudflare Pages / Workers.

---

## 2. Deployment Methods

### Method A: Connect via Cloudflare Dashboard (Recommended for Continuous Deployment)

1. Log into your [Cloudflare Dashboard](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Select your GitHub repository.
4. Set the **Build settings**:
   - **Framework preset**: `Vite` (or `None`)
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (or leave empty)
5. Under **Environment variables**, verify or add:
   - `NODE_VERSION`: `20`
6. Click **Save and Deploy**. Cloudflare Pages will build the application in under 30 seconds and provide a production URL (e.g., `https://learn-by-ceeras.pages.dev`).

---

### Method B: Deploy Directly via Terminal (Wrangler CLI)

You can deploy directly to Cloudflare Pages from your terminal without connecting Git:

1. Build the production assets:
   ```bash
   npm run build
   ```
2. Deploy via Wrangler:
   ```bash
   npx wrangler pages deploy dist --project-name=learn-by-ceeras
   ```
   *(Or run the npm shortcut: `npm run deploy:cloudflare`)*
3. If this is your first time using Wrangler, it will open your browser to authenticate with Cloudflare.

---

## 3. Post-Deployment Verification Checklist

Once deployed to Cloudflare Pages:
- [x] **Home Page**: Verify the hero section, Ceeras logo, and featured courses catalog load cleanly.
- [x] **Direct Route Refresh**: Navigate to `https://<your-project>.pages.dev/learn` and press `Ctrl+F5` (or `Cmd+Shift+R`) to confirm that `_redirects` serves the page without a 404.
- [x] **SQLite WASM Execution**: Open an exercise in Lesson 2 or the Practice Sandbox and click **"Run Query"**. Confirm the query executes locally and displays row results in under 5ms.
- [x] **Theme Persistence**: Switch between Soft Light, Warm Paper, and Soft Dark to verify IndexedDB persistence across sessions.
- [x] **Offline Test**: In Chrome DevTools > Network tab, toggle **Offline** and refresh the page to confirm that the Service Worker (`/sw.js`) serves cached assets.
