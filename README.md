# ⚖️ LegalBot — Indian Legal Intelligence Platform

An AI-powered legal research and study platform covering:
- **IPC** (Indian Penal Code, 1860) — 511 sections
- **CrPC** (Code of Criminal Procedure, 1973) — 484 sections
- **Constitution of India** — Fundamental Rights, DPSP, Fundamental Duties
- **AI Legal Chat** — powered by Claude AI
- **10 Quiz Modules** — comprehensive legal knowledge tests

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher

### Steps

```bash
# 1. Open this folder in terminal

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Open browser at
http://localhost:3000
```

---

## 📁 Project Structure

```
legalbot/
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── public/
│   └── logo.svg            # App favicon
└── src/
    ├── main.jsx            # React entry point
    ├── index.css           # Global styles
    └── App.jsx             # Complete app (all pages & components)
```

---

## 🌐 Pages

| Page | Description |
|------|-------------|
| Landing | Marketing homepage with features and CTA |
| Auth | Sign In / Sign Up / Guest login |
| Dashboard | Stats, quick access, daily legal tip, live clock |
| AI Legal Chat | Ask legal questions, get AI answers with citations |
| Laws Browser | Browse & search IPC and CrPC sections |
| Constitution | Explore Articles 12–51A with full explanations |
| Quizzes | 10 quiz modules with scoring |

---

## 🔧 Connect Your Flask Backend

In `src/App.jsx`, find the `ChatPage` component and replace the Claude API fetch:

```js
// Replace this:
fetch('https://api.anthropic.com/v1/messages', { ... })

// With your Flask route:
const res = await fetch('/ask', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ question: q })
});
const data = await res.json();
// data.answer contains the response
```

Then run Flask on port 5000 and add this to `vite.config.js`:
```js
server: {
  proxy: {
    '/ask': 'http://localhost:5000'
  }
}
```

---

## ☁️ Deploy to Vercel (Free)

```bash
npm install -g vercel
npm run build
vercel
```

---

## 🛠️ Built With

- React 18 + Vite
- Claude AI (Anthropic) for legal chat
- No extra UI libraries needed

---

**Developed by V K THEJUS — Infosys Springboard Internship Project**
