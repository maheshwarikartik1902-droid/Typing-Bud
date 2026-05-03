import React, { useEffect, useRef, useMemo, useState } from 'react'
import { generate } from "random-words";
import UpperMenu from './UpperMenu';
import { useTestMode } from '../context/TestModeContext';
import { Button } from "@/components/ui/button"
import Stats from './Stats';
import Graph from './Graph';
import { useSounds } from '@/hooks/useSounds';

const QUOTES = {
    short: ["The quick brown fox.", "To be or not to be.", "Stay hungry stay foolish."],
    medium: ["The only way to do great work is to love what you do.", "In the middle of every difficulty lies opportunity."],
    long: ["It does not matter how slowly you go as long as you do not stop. Perseverance is the key to success in any endeavor."],
}


const ApiHandler = async (quoteLength) => {



    const lengthMap = { 
        short: { minLength: 0, maxLength: 50 },
        medium: { minLength: 50, maxLength: 200 },
        long: { minLength: 200, maxLength: 500 },
    };

    const { minLength, maxLength } = lengthMap[quoteLength];

    const response = await fetch(`https://motivational-spark-api.vercel.app/api/quotes`);
    const data = await response.json();

    const matching = data.filter(q =>
        q.quote.length >= minLength && q.quote.length <= maxLength
    );

    if (matching.length === 0) return QUOTES[quoteLength][0].split(' ');

    const quote = matching[Math.floor(Math.random() * matching.length)];

    return quote.quote.split(' ');
}


const buildWordArray = (mode, wordCount, punctuation, numbers, quoteLength) => {
    if (mode === 'quote') {
        return [];
    }

    let words = generate({ exactly: mode === 'words' ? wordCount : 50 });

    if (punctuation) {
        const puncts = [',', '.', '!', '?', ';', ':'];
        words = words.map(w =>
            Math.random() < 0.3
                ? w + puncts[Math.floor(Math.random() * puncts.length)]
                : w
        );
    }

    if (numbers) {
        words = words.map(w =>
            Math.random() < 0.2
                ? String(Math.floor(Math.random() * 100))
                : w
        );
    }
    return words;
};

const TypingBox = React.memo(() => {
    const { testTime, setResetKey, wordCount, punctuation, numbers, mode, quoteLength, sound, setSound } = useTestMode();
    const {playKey, spaceKey} = useSounds();
    const [countdown, setCountdown] = useState(testTime);
    const [wordsTyped, setWordsTyped] = useState(0);  // ✅ track words typed
    const [currWordIndex, setCurrWordIndex] = useState(0);
    const [currCharIndex, setCurrCharIndex] = useState(0);
    const [testEnded, setTestEnded] = useState(false);
    const [correctChar, setCorrectChar] = useState(0);
    const [incorrectChar, setIncorrectChar] = useState(0);
    const [missedChar, setMissedChar] = useState(0);
    const [extraChar, setExtraChar] = useState(0);
    const [correctWords, setCorrectWords] = useState(0);
    const [graphHistory, setGraphHistory] = useState([]);
    const [wordArray, setWordArray] = useState(() => buildWordArray(mode, wordCount, punctuation, numbers, quoteLength));
    const [isLoading, setIsLoading] = useState(false);
    const intervalRef = useRef(null);
    const correctCharRef = useRef(0);
    const incorrectCharRef = useRef(0);
    const missedCharRef = useRef(0);
    const extraCharRef = useRef(0);
    const elapsedRef = useRef(0);
    const inputRef = useRef(null);

    const focusInput = () => inputRef.current.focus();

    const wordsSpanRef = useMemo(() => {
        return Array(wordArray.length).fill(0).map(() => React.createRef());
    }, [wordArray]);

    const startTimer = () => {
        if (intervalRef.current || mode !== 'time') return;
        intervalRef.current = setInterval(() => {
            elapsedRef.current += 1;
            const wpm = Math.round(
                (correctCharRef.current / 5) / (elapsedRef.current / 60)
            );
            setGraphHistory(prev => [...prev, {
                second: elapsedRef.current,
                wpm,
                errors: incorrectCharRef.current + missedCharRef.current + extraCharRef.current
            }]);
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setTestEnded(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };


    //loading quotes 
    const loadQuote = async () => {
        setIsLoading(true);
        try {
            const words = await ApiHandler(quoteLength);
            setWordArray(words);
        } catch (err) {
            const fallback = QUOTES[quoteLength];
            const quote = fallback[Math.floor(Math.random() * fallback.length)];
            setWordArray(quote.split(' '));
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 500)

        }
    }


    const handleUserInput = (e) => {
        if (testEnded) return;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        const allowed = e.key.length === 1 || e.key === 'Backspace' || e.key === ' ';
        if (!allowed) return;

        if (!intervalRef.current && mode !== 'time') {
            const isNoOp =
                (e.key === 'Backspace' && currCharIndex === 0 && currWordIndex === 0) ||
                (e.key === ' ' && currCharIndex === 0);

            if (!isNoOp) {
                intervalRef.current = setInterval(() => {
                    elapsedRef.current += 1;
                    const wpm = Math.round(
                        (correctCharRef.current / 5) / (elapsedRef.current / 60)
                    );
                    setGraphHistory(prev => [...prev, {
                        second: elapsedRef.current,
                        wpm,
                        errors: incorrectCharRef.current + missedCharRef.current + extraCharRef.current
                    }]);
                }, 1000);
            }
        }
        
        // start timer only for time mode
        if (mode === 'time') {
            const isNoOp =
                (e.key === 'Backspace' && currCharIndex === 0 && currWordIndex === 0) ||
                (e.key === ' ' && currCharIndex === 0);
            if (!intervalRef.current && !isNoOp) startTimer();
        }

        const allCurrChars = wordsSpanRef[currWordIndex].current.childNodes;

        if (e.key === ' ') {
            spaceKey();
            let correctCharsInWord = wordsSpanRef[currWordIndex].current.querySelectorAll('.correct').length;
            if (correctCharsInWord === allCurrChars.length) {
                setCorrectWords(prev => prev + 1);
            }

            // ✅ mark missed chars
            for (let i = currCharIndex; i < allCurrChars.length; i++) {
                if (!allCurrChars[i].classList.contains('incorrect')) {
                    allCurrChars[i].classList.add('incorrect');
                    setMissedChar(prev => prev + 1);
                    missedCharRef.current += 1;
                }
            }

            const newWordsTyped = currWordIndex + 1;
            setWordsTyped(newWordsTyped);

            // ✅ end test in words/quote mode when all words are done
            if (mode === 'words' || mode === 'quote') {
                if (currWordIndex + 1 >= wordArray.length) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                    setTestEnded(true);
                    return;
                }
            }

            if (currWordIndex + 1 >= wordsSpanRef.length) {
                allCurrChars[Math.min(currCharIndex, allCurrChars.length - 1)].classList.remove('current', 'current-right');
                return;
            }

            allCurrChars[Math.min(currCharIndex, allCurrChars.length - 1)].classList.remove('current', 'current-right');
            wordsSpanRef[currWordIndex + 1].current.childNodes[0].className = 'current';
            setCurrWordIndex(prev => prev + 1);
            setCurrCharIndex(0);
            return;
        }
        playKey();
        if (e.key === 'Backspace') {
            
            if (currCharIndex === 0) {
                if (currWordIndex === 0) return;
                allCurrChars[0].classList.remove('current');
                const prevChars = wordsSpanRef[currWordIndex - 1].current.childNodes;
                prevChars[prevChars.length - 1].classList.add('current-right');
                setCurrWordIndex(currWordIndex - 1);
                setCurrCharIndex(prevChars.length);
                return;
            }
            if (currCharIndex === allCurrChars.length &&
                allCurrChars[currCharIndex - 1].classList.contains('extra')) {
                allCurrChars[currCharIndex - 1].remove();
                allCurrChars[currCharIndex - 2].classList.add('current-right');
                setCurrCharIndex(currCharIndex - 1);
                return;
            }
            if (currCharIndex >= allCurrChars.length) {
                allCurrChars[allCurrChars.length - 1].classList.remove('current-right', 'incorrect', 'correct');
                allCurrChars[allCurrChars.length - 1].classList.add('current');
                setCurrCharIndex(allCurrChars.length - 1);
                return;
            }
            allCurrChars[currCharIndex].classList.remove('current');
            allCurrChars[currCharIndex - 1].className = 'current';
            setCurrCharIndex(currCharIndex - 1);
            return;
        }
        if (currCharIndex === allCurrChars.length) {
            const newSpan = document.createElement("span");
            newSpan.innerText = e.key;
            newSpan.className = 'incorrect extra current-right';
            allCurrChars[currCharIndex - 1].classList.remove('current-right');
            wordsSpanRef[currWordIndex].current.appendChild(newSpan);
            setCurrCharIndex(currCharIndex + 1);
            setExtraChar(prev => prev + 1);
            extraCharRef.current += 1;
            return;
        }

        if (currCharIndex >= allCurrChars.length) return;

        if (e.key === allCurrChars[currCharIndex].innerText) {
            allCurrChars[currCharIndex].className = 'correct';
            correctCharRef.current += 1;
            setCorrectChar(prev => prev + 1);
        }
        else {
            allCurrChars[currCharIndex].className = 'incorrect';
            setIncorrectChar(prev => prev + 1);
            incorrectCharRef.current += 1;
        }

        if (currCharIndex === allCurrChars.length - 1) {
            allCurrChars[currCharIndex].className += ' current-right';
        } else {
            allCurrChars[currCharIndex + 1].className = 'current';
        }

        setCurrCharIndex(currCharIndex + 1);
    };

    useEffect(() => {
        focusInput();
        if (wordsSpanRef[0]?.current?.childNodes[0]) {
            wordsSpanRef[0].current.childNodes[0].classList.add('current');
        }
    }, [wordArray]);

    useEffect(() => {
        if (mode == 'quote') {
            loadQuote();
        }
        else {
            setWordArray(buildWordArray(mode, wordCount, punctuation, numbers));
        }
    }, [mode, quoteLength, wordCount, punctuation, numbers]);

    const calculateWPM = () => {
        //  use elapsedRef for time mode, elapsed tracking for others
        const elapsed = mode === 'time'
            ? testTime - countdown
            : elapsedRef.current;
        if (elapsed === 0) return 0;
        return Math.round((correctChar / 5) / (elapsed / 60));
    };

    const calculateAccuracy = () => {
        const total = correctChar + incorrectChar + missedChar + extraChar;
        if (total === 0) return 0;
        return Math.max(
            0,
            Math.min(100, Math.round((correctChar / total) * 100))
        );
    };

    const resetTest = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setCountdown(testTime);
        setWordsTyped(0);
        setCurrWordIndex(0);
        setCurrCharIndex(0);
        setTestEnded(false);
        correctCharRef.current = 0;
        incorrectCharRef.current = 0;
        missedCharRef.current = 0;
        extraCharRef.current = 0;
        elapsedRef.current = 0;
        setCorrectChar(0);
        setIncorrectChar(0);
        setMissedChar(0);
        setExtraChar(0);
        setCorrectWords(0);
        setGraphHistory([]);
        if (mode === 'quote') {
            loadQuote();
        }
        else {
            setWordArray(buildWordArray(mode, wordCount, punctuation, numbers));
        }
    };

    return (
        <div>
            <UpperMenu
                countdown={countdown}
                wordsTyped={wordsTyped}
                totalWords={wordArray.length}
                onReset={resetTest}
                isLoading={isLoading}
            />
            {isLoading ? (
                <div className="type-box">
                    <div className="flex items-center justify-center h-32 opacity-50">
                        <span className="loading loading-dots loading-md" />
                    </div>
                </div>
            ) :

                testEnded ? (
                    <div className="result-container">
                        <div className="left-panel">
                            <Stats
                                wpm={calculateWPM()}
                                accuracy={calculateAccuracy()}
                                correctChar={correctChar}
                                incorrectChar={incorrectChar}
                                missedChar={missedChar}
                                extraChar={extraChar}
                            />
                        </div>

                        <div className="right-panel">
                            <Graph graphHistory={graphHistory} />
                        </div>
                    </div>
                ) : (
                    <div className='type-box' onClick={focusInput}>
                        <div className='words'>
                            {wordArray.map((word, wordIndex) => (
                                <span className="word" key={wordIndex} ref={wordsSpanRef[wordIndex]}>
                                    {word.split("").map((char, charIndex) => (
                                        <span key={charIndex}>{char}</span>
                                    ))}
                                </span>
                            ))}
                        </div>
                    </div>

                )}
            
            <input
                type="text"
                ref={inputRef}
                className='hidden-input'
                onKeyDown={(e) => {
                    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
                        e.preventDefault();
                    }
                    // Tab restarts test
                    if (e.key === 'Tab') {
                        e.preventDefault();
                        setResetKey(prev => prev + 1);
                        return;
                    }
                    handleUserInput(e);
                }}
            />
        </div>
    );
});

export default TypingBox;