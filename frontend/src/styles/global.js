import { createGlobalStyle, keyframes } from "styled-components";

const blinkLeft = keyframes`
  0%, 100% { box-shadow: -2px 0 0 0 transparent; }
  50%       { box-shadow: -2px 0 0 0 currentColor; }
`;

const blinkRight = keyframes`
  0%, 100% { box-shadow: 2px 0 0 0 transparent; }
  50%       { box-shadow: 2px 0 0 0 currentColor; }
`;


const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-2px); }
  40% { transform: translateX(2px); }
  60% { transform: translateX(-2px); }
  80% { transform: translateX(2px); }
`;

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: monospace;
    transition: background-color 0.3s ease, color 0.3s ease;

    /*
      ✅ FIX: DaisyUI v4 stores CSS variables as FULL values e.g. oklch(98% 0 0).
         Use var() directly — NOT oklch(var()) which double-wraps and produces
         invalid CSS like oklch(oklch(98% 0 0)) → transparent/invisible.
    */
    background-color: var(--color-base-100);
    color: var(--color-base-content);
  }

  .canvas {
    height: 100vh;
    width: 100%;
    display: grid;
    grid-template-rows: auto 1fr auto;
    gap: 0.75rem;
    align-items: center;
    text-align: center;
    letter-spacing: 0.08rem;
    padding: 1rem;
    background-color: inherit;
    color: inherit;
    position: relative;
  }

  .header,
  .footer {
    width: 100%;
  }

  .type-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .retry-btn {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
  }
  

  .words {
    font-size: 24px;
    line-height: 1.8;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    justify-content: center;
    gap: 0.35rem;
  }

  .word {
    margin: 0;
  }

  .hidden-input {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
    pointer-events: none;
    overflow: hidden;
  }

  /* ✅ FIX: correct should not shake — only incorrect should */
  .correct {
    color: var(--color-success);
  }

  .incorrect {
    animation: ${shake} 0.3s ease;
    color: var(--color-error);
  }

  /*
    current text color so it's always visible regardless of theme.
    No DaisyUI variable lookup needed, zero risk of transparent cursor.
  */
  .current {
    box-shadow: -2px 0 0 0 currentColor;
    animation: ${blinkLeft} 1s infinite;
  }

  .current-right {
    box-shadow: 2px 0 0 0 currentColor;
    animation: ${blinkRight} 1s infinite;
  }

  .upper-menu {
    display: flex;
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    justify-content: space-between;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
  }

  .modes {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    align-items: center;
  }

  .time-mode {
    transition: color 0.2s ease, opacity 0.2s ease;
    cursor: pointer;
    opacity: 0.5;
  }

  /* MAIN RESULT LAYOUT */
  .result-container {
    display: grid;
    grid-template-columns: 320px 1fr;
    gap: 1.5rem;
    width: 100%;
    max-width: 1200px;
    margin: 2rem auto 0;
    padding: 0 1rem;
    align-items: stretch;
  }

  /* LEFT SIDE (Stats) */
  .left-panel {
    display: flex;
  }

  /* RIGHT SIDE (Graph) */
  .right-panel {
    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  /* MAKE GRAPH CARD FILL SPACE */
  .right-panel > * {
    width: 100%;
    height: 100%;
  }

  /* STATS STACK */
  .stats-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  }

  /* STAT CARDS */
  .stat {
    padding: 1.2rem;
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.06);
    backdrop-filter: blur(8px);
    transition: all 0.2s ease;
  }

  .stat:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.1);
  }
  /* TEXT */
.title {
  font-size: 0.85rem;
  opacity: 0.7;
}

.value {
  font-size: 2rem;
  font-weight: bold;
}

/* CHARACTER GRID */
.char-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem 1rem;
  margin-top: 0.5rem;
}

.char-grid div {
  display: flex;
  justify-content: space-between;
}

  /* COLORS */
  .char-grid div:nth-child(1) span { color: #22c55e; }
  .char-grid div:nth-child(2) span { color: #ef4444; }
  .char-grid div:nth-child(3) span { color: #facc15; }
  .char-grid div:nth-child(4) span { color: #38bdf8; }

  @media (max-width: 900px) {
  .result-container {
    grid-template-columns: 1fr;
  }

  .right-panel > * {
    width: 100%;
    height: 100%;
  }
}

.footer-area {
    width: 100%;
    align-self: end;  /* ✅ sticks to bottom of grid row naturally */
} 

  /*
     the second one (hardcoded white) silently overrode the first */
  .time-mode:hover {
    opacity: 1;
    color: var(--color-primary);
  }

  /* Active selected time mode */
  .time-mode-active {
    opacity: 1;
    color: var(--color-primary);
    font-weight: bold;
  }

  @media (max-width: 640px) {
    .words {
      font-size: 18px;
    }

    .upper-menu {
      font-size: 1rem;
    }

    .canvas {
      padding: 0.75rem;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation: none !important;
      transition: none !important;
      scroll-behavior: auto !important;
    }
  }
`;