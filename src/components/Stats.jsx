import React from 'react'

const Stats = ({ wpm, accuracy, correctChar, incorrectChar, missedChar, extraChar }) => {
    return (
        <div className="stats-box">
            <div className="stat">
                <div className="title">WPM</div>
                <div className="value">{wpm}</div>
            </div>

            <div className="stat">
                <div className="title">Accuracy</div>
                <div className="value">{accuracy}%</div>
            </div>

            <div className="stat char-stat">
                <div className="title">Characters</div>
                <div className="char-grid">
                    <div>Correct <span>{correctChar}</span></div>
                    <div>Incorrect <span>{incorrectChar}</span></div>
                    <div>Missed <span>{missedChar}</span></div>
                    <div>Extra <span>{extraChar}</span></div>
                </div>
            </div>
        </div>
    )
}

export default Stats