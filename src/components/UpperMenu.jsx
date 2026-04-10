import React from 'react'
import { useTestMode } from '../context/TestModeContext'

const TIMES       = [15, 30, 60]
const WORD_COUNTS = [10, 25, 50]
const QUOTE_SIZES = ['short', 'medium', 'long']

const UpperMenu = ({ countdown, wordsTyped, totalWords, onReset }) => {
    const {
        mode,
        testTime, setTestTime,
        wordCount, setWordCount,
        quoteLength, setQuoteLength,
        punctuation, setPunctuation,
        numbers, setNumbers,
        setResetKey,
    } = useTestMode();

    const reset = () => {
        onReset?.();
        setResetKey(prev => prev + 1);
    };

    return (
        <div className="upper-menu">

            <div className="counter">
                {mode === 'time'  && <p>{countdown}s</p>}
                {mode === 'words' && <p>{wordsTyped} / {totalWords}</p>}
                {mode === 'quote' && <p>{wordsTyped} / {totalWords}</p>}
            </div>

            <div className="modes">

                {mode !== 'quote' && (
                    <>
                        <button
                            onClick={() => { setPunctuation(p => !p); reset(); }}
                            className={`time-mode ${punctuation ? 'time-mode-active' : ''}`}
                        >
                            !@#
                        </button>
                        <button
                            onClick={() => { setNumbers(n => !n); reset(); }}
                            className={`time-mode ${numbers ? 'time-mode-active' : ''}`}
                        >
                            123
                        </button>
                        <span className="opacity-20">|</span>
                    </>
                )}

                {mode === 'time' && TIMES.map(t => (
                    <div
                        key={t}
                        onClick={() => { setTestTime(t); reset(); }}
                        className={`time-mode ${testTime === t ? 'time-mode-active' : ''}`}
                    >
                        {t}s
                    </div>
                ))}

                {mode === 'words' && WORD_COUNTS.map(w => (
                    <div
                        key={w}
                        onClick={() => { setWordCount(w); reset(); }}
                        className={`time-mode ${wordCount === w ? 'time-mode-active' : ''}`}
                    >
                        {w}
                    </div>
                ))}

                {mode === 'quote' && QUOTE_SIZES.map(s => (
                    <div
                        key={s}
                        onClick={() => { setQuoteLength(s); reset(); }}
                        className={`time-mode ${quoteLength === s ? 'time-mode-active' : ''}`}
                    >
                        {s}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UpperMenu