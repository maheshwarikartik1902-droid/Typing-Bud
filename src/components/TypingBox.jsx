import React, { useEffect, useRef, useMemo, createRef } from 'react'
import { generate, count } from "random-words";
import { useState } from 'react';
import UpperMenu from './UpperMenu';
import { useTestMode } from '../context/TestModeContext';
import { div } from 'framer-motion/client';


const TypingBox = () => {
    const { testTime, setTestTime } = useTestMode();
    const [countdown, setCountdown] = useState(testTime);
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    //creating words
    const [wordArray, setWordArray] = useState(() => {
        return generate({ min: 15, max: 30 });
    });

    //handling user inoput;
    const inputRef = useRef(null);

    const handleUserInput = (e) => {
        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

        // ── Space key ────────────────────────────────────────────────────────────
        if (e.key === ' ') {
            if (currCharIndex >= allCurrChars.length) {
                //  guard against pressing space on the last word
                if (currWordIndex + 1 >= wordsSpanRef.length) return;

                // Advance to next word
                allCurrChars[allCurrChars.length - 1].classList.remove('current-right');
                wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';
                setCurrWordIndex(currWordIndex + 1);
                setCurrCharIndex(0);
                return;
            }
            //mid-word space falls through to typing logic below
            // (space will be marked incorrect since no word contains a space char)
        }

        // ── Backspace key ────────────────────────────────────────────────────────
        if (e.key === 'Backspace') {
            if (currCharIndex === 0) {
                if (currWordIndex === 0) return;

                // Move cursor back to end of previous word
                allCurrChars[0].classList.remove('current');
                const prevChars = wordsSpanRef[currWordIndex - 1].current.childNodes;
                prevChars[prevChars.length - 1].classList.add('current-right');
                setCurrWordIndex(currWordIndex - 1);
                // Bug 3 fix: use .length (not .length-1) so the current-right 
                // state check (currCharIndex >= allCurrChars.length) works correctly
                setCurrCharIndex(prevChars.length);
                return;
            }

            if (currCharIndex >= allCurrChars.length) {
                // Cursor is after last char — erase it and move cursor back
                allCurrChars[allCurrChars.length - 1].classList.remove('current-right');
                allCurrChars[allCurrChars.length - 1].className = 'current';
                setCurrCharIndex(allCurrChars.length - 1);
                return;
            }

            // Normal mid-word backspace
            allCurrChars[currCharIndex].classList.remove('current');
            allCurrChars[currCharIndex - 1].className = 'current';
            setCurrCharIndex(currCharIndex - 1);
            return;
        }

        // ── Typing (all keys including mid-word space) ───────────────────────────
        //gnore input if cursor is past the end of the word
        if (currCharIndex >= allCurrChars.length) return;

        // Bug 5 fix: removed leading space from className strings
        allCurrChars[currCharIndex].className =
            e.key === allCurrChars[currCharIndex].innerText ? 'correct' : 'incorrect';

        if (currCharIndex === allCurrChars.length - 1) {
            allCurrChars[currCharIndex].className += ' current-right';
        } else {
            allCurrChars[currCharIndex + 1].className = 'current';
        }

        setCurrCharIndex(currCharIndex + 1);
    };


    const focusInput = () => {
        inputRef.current.focus();
    }

    //creating reference for each word span
    const wordsSpanRef = useMemo(() => {
        return Array(wordArray.length).fill(0).map(() => React.createRef());
    }, [wordArray])

    useEffect(() => {
        focusInput();
        wordsSpanRef[0].current.childNodes[0].classList = "current";
    }, [])


    useEffect(() => {
        resetTest();
    }, [testTime]);

    //reseting a test
    const resetTest = () => {
        setCountdown(testTime);
        setWordArray(generate({ exactly: 30 }));
    }

    return (
        <div>
            <div className='type-box' onClick={focusInput}>
                <UpperMenu countdown={countdown} />
                <div className='words'>
                    {
                        wordArray.map((word, wordIndex) => (
                            <span className="word" key={wordIndex} ref={wordsSpanRef[wordIndex]}>
                                {
                                    word.split("").map((char, charIndex) => (
                                        <span key={charIndex}>{char}</span>
                                    ))
                                }
                            </span>
                        ))
                    }
                </div>
            </div>
            <input
                type="text"
                name='text'
                ref={inputRef}
                className='hidden-input'
                onKeyDown={handleUserInput}

            />
        </div>

    )
}

export default TypingBox