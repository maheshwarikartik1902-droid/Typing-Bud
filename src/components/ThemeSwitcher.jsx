//import { dark } from 'node_modules/@mui/material/styles/createPalette';
import React, { useEffect, useState } from 'react';
import { useTheme } from '../provider/ThemeProvider';

const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme();

    return (
        <>
        <div>Theme: </div>
        <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1">
                {theme}
            </div>

            <ul className="dropdown-content bg-base-300 rounded-box z-1 w-52 p-2 shadow-2xl max-h-60 overflow-y-auto scroll-smooth">
                {["light", "retro", "cyberpunk", "valentine", "aqua", "dark","cupcake","synthwave","black","fantasy","lofi","pastel","halloween","forest","luxury","business","coffee","night","abyss","sunset","caramellatte"].map((t) => (
                    <li key={t}>
                        <button
                            className="btn btn-sm btn-ghost w-full justify-start"
                            onClick={() => setTheme(t)}
                        >
                            {t}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default ThemeSwitcher;