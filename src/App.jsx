import './App.css'
import { GlobalStyles } from './styles/global.js';
import TypingBox from './components/TypingBox';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemeProvider from './provider/ThemeProvider';
import { useTestMode } from './context/TestModeContext';
import Navbar from './components/Navbar';
// ✅ FIX: removed unused Children import, unused UpperMenu import, unused count state

function App() {
    const { testTime, resetKey } = useTestMode();
    
    return (
        <ThemeProvider>
            <GlobalStyles />
            {/* bg-base-100 and text-base-content are DaisyUI utility classes
                that respond to data-theme changes automatically */}
            <div className='canvas bg-base-100 text-base-content'>
                <Navbar />
                <TypingBox key={`${testTime}-${resetKey}`} />
                <div className='footer flex flex-row items-center gap-2'>
                    <p>footer</p>
                </div>
            </div>
        </ThemeProvider>
    );
}

export default App;