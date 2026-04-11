import './App.css'
import { GlobalStyles } from './styles/global.js';
import TypingBox from './components/TypingBox';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemeProvider from './provider/ThemeProvider';
import { useTestMode } from './context/TestModeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Button } from "@/components/ui/button"

function App() {
    const { testTime, resetKey, setResetKey } = useTestMode();

    return (
        <ThemeProvider>
            <GlobalStyles />
            {/* bg-base-100 and text-base-content are DaisyUI utility classes
                that respond to data-theme changes automatically */}
            <div className='canvas bg-base-100 text-base-content'>
                <header className="header">
                    <Navbar />
                </header>

                <TypingBox key={`${testTime}-${resetKey}`} />

                <Button className="mx-auto block px-6 py-2 hover:bg-primary hover:text-(--color-primary-content) mb-32" variant="outline" onClick={() => setResetKey(prev => prev + 1)}>
                    Retry
                </Button>
                <footer className="footer-area">
                    <Footer />
                </footer>
            </div>
        </ThemeProvider>
    );
}

export default App;