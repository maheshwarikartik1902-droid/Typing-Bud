# 1. Typing Bud

A minimalist, feature-rich typing speed web application built with React.js. Test your WPM, track accuracy, and improve your typing — distraction free.

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5B21B6?style=flat)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0055?style=flat&logo=framer&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=jsonwebtokens&logoColor=white)

---

## 2. Features

- **Three Test Modes** — Time Attack (15s / 30s / 60s), Word Count, and Quote Mode
- **Real-Time Keystroke Engine** — tracks correct, incorrect, missed, and extra characters per word
- **Quote Mode** — live quotes fetched from a REST API (short / medium / long)
- **Punctuation & Numbers** — optional toggles to add realistic complexity
- **Sound Feedback** — mechanical key click and space sounds on every keystroke
- **Theme Switching** — multiple themes via DaisyUI (Nord, Carbon, and more)
- **Backspace Navigation** — delete across word boundaries, remove extra characters

---

## 3. Demo

> **Live:** [typing-bud.vercel.app](https://typing-bud.vercel.app) 

---

## 4. Test Modes

| Mode | Description |
|---|---|
| **Time** | Type as many words as possible within 15s, 30s, or 60s |
| **Words** | Complete a fixed number of words at your own pace |
| **Quote** | Type a short, medium, or long quote fetched live from an API |

---

## 5. Metrics Tracked

- **WPM** — `(correct characters / 5) / elapsed minutes`
- **Accuracy** — `correct chars / (correct + incorrect + missed + extra) × 100`
- **Correct Characters**
- **Incorrect Characters**
- **Missed Characters** — characters skipped over with Space
- **Extra Characters** — characters typed beyond word length
- **Per-second WPM graph** — plotted throughout the test duration

---

## 6. Themes

Themes are powered by DaisyUI and toggled via a `data-theme` attribute on the root element. The theme preference persists across sessions.


```js
daisyui: {
  themes: ["dark", "nord", "carbon", "your-custom-theme"],
}
```

---

## 7. Built With

| Technology | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [DaisyUI](https://daisyui.com) | Theme system + UI components |
| [Framer Motion](https://www.framer.com/motion/) | Page transitions + animations |
| [shadcn/ui](https://recharts.org) | WPM graph |
| [random-words](https://www.npmjs.com/package/random-words) | Word generation |
