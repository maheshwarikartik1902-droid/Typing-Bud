import './App.css'
import { GlobalStyles } from './styles/global.js';
import TypingBox from './components/TypingBox';
import ThemeSwitcher from './components/ThemeSwitcher';
import ThemeProvider from './provider/ThemeProvider';
import { useTestMode } from './context/TestModeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Button } from "@/components/ui/button"
import { BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { AnimatePresence } from 'framer-motion';
import PageTransition from './components/PageTransition';


function AnimatedRoutes() {
    const location = useLocation();
    const { testTime, resetKey, setResetKey } = useTestMode();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>

                <Route path="/" element={
                    <PageTransition>
                        <LandingPage />
                    </PageTransition>
                }/>

                <Route path="/practice" element={
                    <PageTransition>
                        <AppLayout />
                    </PageTransition>
                }/>

            </Routes>
        </AnimatePresence>
    );
}


function AppLayout() {
    const {testTime, resetKey, setResetKey} = useTestMode();
    return(
        
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
    )
};


function App() {
    return (
        <BrowserRouter>
            <ThemeProvider>
                <GlobalStyles />
                <AnimatedRoutes/>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;