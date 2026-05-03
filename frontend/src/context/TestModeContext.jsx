import { UsersRound } from "lucide-react";
import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

export const TestModeContextProvider = ({ children }) => {
    const [mode, setMode] = useState('time');       // 'time' | 'words' | 'quote'
    const [testTime, setTestTime] = useState(15);
    const [wordCount, setWordCount] = useState(25);
    const [quoteLength, setQuoteLength] = useState('short'); // 'short' | 'medium' | 'long'
    const [punctuation, setPunctuation] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [resetKey, setResetKey] = useState(0);
    const [sound, setSound] = useState(false);
    const [soundType, setSoundType] = useState('key')
    const [volume, setVolume] = useState(0.5);

    const values = {
        mode, setMode,
        testTime, setTestTime,
        wordCount, setWordCount,
        quoteLength, setQuoteLength,
        punctuation, setPunctuation,
        numbers, setNumbers,
        resetKey, setResetKey,
        sound, setSound, 
        volume, setVolume,
        soundType, setSoundType,
    };

    return (
        <TestModeContext.Provider value={values}>
            {children}
        </TestModeContext.Provider>
    );
};

export const useTestMode = () => useContext(TestModeContext);