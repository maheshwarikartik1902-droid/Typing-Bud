import React from 'react'

const Footer = () => {
    return (
        <div className="w-full p-4 bg-base-200 text-base-content">
            <div className="flex items-center justify-center gap-2 text-sm opacity-60">
                <span>Typing Bud</span>
                <span>·</span>
                <span>Press <kbd className="kbd kbd-xs">Tab</kbd> to restart</span>
                <span>·</span>
                <span>Built with React</span>
            </div>
        </div>
    )
}

export default Footer