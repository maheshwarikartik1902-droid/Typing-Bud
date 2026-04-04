import { createGlobalStyle, keyframes } from "styled-components";

const blinkLeft = keyframes`
    0% { border-left-color: white; }
    25% { border-left-color: #1d293d; }
    50% { border-left-color: white; }
    75% { border-left-color: #1d293d; }
    100% { border-left-color: white; }
`;

const blinkRight = keyframes`
    0% { border-right-color: white; }
    25% { border-right-color: #1d293d; }
    50% { border-right-color: white; }
    75% { border-right-color: #1d293d; }
    100% { border-right-color: white; }
`;

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    }

    body {
        background-color: #1d293d;
        color: yellow;
        margin: 0;
        padding: 0;
        transition: all 0.2s ease-in-out;
        font-family: monospace;
    }

    .canvas {
        display: grid;
        min-height: 100vh;
        grid-template-rows: auto 1fr auto;
        gap: 0.5rem;
        width: 100%;
        align-items: center;
        text-align: center;
        letter-spacing: 0.1rem;
    }

    .type-box {
        display: flex;
        flex-direction: column;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        
    }

    .words {
        font-size: 24px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: center;
    }

    .word {
        margin: 5px;
    } 

    .hidden-input {
        opacity:0;
        position: absolute;
        pointer-events: none;
    }
    .correct {
        animation: shake 0.3s ease;
        color: green;
    }
    .incorrect {
        animation: shake 0.3s ease;
        color: red;
    }

    .current {
        border-left: 1px solid;
        animation: ${blinkLeft} 2s infinite ease;
    } 

    .current-right{
        border-right: 1px solid;
        animation: ${blinkRight} 2s infinite ease;
    }

    .upper-menu {
        display: flex;
        width: 100%;
        max-width: 1000px;
        margin-left: auto;
        margin-right: auto;
        justify-content: space-between;
        font-size: 1.2rem;
        padding: 0.5rem;
    }

    .modes {
        display: flex;
        gap: 0.5rem;
    }

    .time-mode {
        transition: color 0.2s ease;
    }

    .time-mode:hover{
        cursor: pointer;
        color: white;
    }

`;