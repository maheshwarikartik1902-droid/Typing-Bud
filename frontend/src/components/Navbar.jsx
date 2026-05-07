import React from 'react'
import { useTestMode } from '../context/TestModeContext'
import { useTheme } from '../provider/ThemeProvider';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Settings, Timer, CaseSensitive, Quote } from 'lucide-react'
import ThemeSwitcher from './ThemeSwitcher'
const MODES = [
    { id: 'time', label: 'Time', icon: Timer },
    { id: 'words', label: 'Words', icon: CaseSensitive },
    { id: 'quote', label: 'Quote', icon: Quote },
]


const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const { theme, setTheme } = useTheme();
    const { mode, setMode, setResetKey, sound, setSound, volume, setVolume, soundType, setSoundType } = useTestMode();


    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    const handleMode = (m) => {
        setMode(m);
        setResetKey(prev => prev + 1);
    };

    return (
        <div className="navbar bg-base-200 shadow-sm px-4 gap-4">

            {/* Logo */}
            <div className="navbar-start ml-10">
                <span className="text-xl font-bold text-primary" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Typing Bud</span>
            </div>

            {/* Mode selector */}
            <div className="navbar-end gap-1">
                {MODES.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        onClick={() => handleMode(id)}
                        className={`btn btn-sm gap-2 ${mode === id ? 'btn-primary' : 'btn-ghost'}`}
                    >
                        <Icon size={14} />
                        {label}
                    </button>
                ))}
            </div>

            <div className="divider divider-horizontal mx-0" />

            {/* Settings */}
            <div className="flex justify-center items-center gap-2">

                <details className="dropdown dropdown-end">
                    <summary className="btn btn-ghost btn-sm btn-circle"><Settings size={18} /></summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm opacity-60 font-mono pb-2 text-center">
                                    Hey {user?.username}
                                </span>
                                <li>
                                    <button onClick={handleLogout} className="btn btn-ghost btn-sm">Logout</button>
                                </li>
                                <li>
                                    <button className='justify-center text-center '
                                        onClick={() => document.getElementById('settings_modal').showModal()}
                                    >
                                        Settings
                                    </button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <button className='justify-center text-center '
                                        onClick={() => document.getElementById('settings_modal').showModal()}
                                    >
                                        Settings
                                    </button>
                                </li>
                                <button onClick={() => navigate('/register')} className="btn btn-ghost btn-sm">SignUp/Login</button>
                            </>
                        )}
                    </ul>
                </details>

            </div>

            {/* Settings Modal */}
            <dialog id="settings_modal" className="modal">
                <div className="modal-box w-11/12 max-w-lg">
                    <h3 className="font-bold text-lg mb-6">Settings</h3>

                    {/* Theme section */}
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold opacity-60 uppercase tracking-widest mb-3">Theme</h4>
                        <div className="flex flex-wrap gap-2">
                            {["light", "dark", "retro", "cyberpunk", "valentine", "aqua", "cupcake",
                                "synthwave", "black", "fantasy", "lofi", "pastel", "halloween", "forest",
                                "luxury", "business", "coffee", "night", "abyss", "sunset", "caramellatte"
                            ].map(t => (
                                <button
                                    key={t}
                                    onClick={() => setTheme(t)}
                                    className={`btn btn-sm ${theme === t ? 'btn-primary' : 'btn-ghost'}`}
                                >
                                    {t}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sound section placeholder */}
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold opacity-60 uppercase tracking-widest mb-3">
                            Sound
                        </h4>

                        <div className="flex flex-col gap-4">

                            {/* Sound type selector */}
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Sound type</span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => { setSound(true); setSoundType('key'); }}
                                        className={`btn btn-sm ${sound && soundType === 'key' ? 'btn-primary' : 'btn-ghost'}`}
                                    >
                                        Key
                                    </button>
                                    <button
                                        onClick={() => { setSound(true); setSoundType('typeWriter'); }}
                                        className={`btn btn-sm ${sound && soundType === 'typeWriter' ? 'btn-primary' : 'btn-ghost'}`}
                                    >
                                        Typewriter
                                    </button>
                                    <button
                                        onClick={() => setSound(false)}
                                        className={`btn btn-sm ${!sound ? 'btn-primary' : 'btn-ghost'}`}
                                    >
                                        🔇 Off
                                    </button>
                                </div>
                            </div>


                            {/* volume slider — only show when enabled */}
                            {sound && (
                                <div className="flex items-center gap-3">
                                    <span className="text-sm opacity-60">Volume</span>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={volume}
                                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                                        className="range range-primary range-sm flex-1"
                                    />
                                    <span className="text-sm opacity-60 w-8">
                                        {Math.round(volume * 100)}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Display section placeholder */}
                    <div className="mb-6">
                        <h4 className="text-sm font-semibold opacity-60 uppercase tracking-widest mb-3">Display</h4>
                        <p className="text-sm opacity-40">Coming soon</p>
                    </div>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
    )
}

export default Navbar