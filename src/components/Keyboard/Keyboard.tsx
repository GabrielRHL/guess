import React from 'react'
import './Keyboard.css'

interface KeyboardProps {
    onKeyClick: (key: string) => void
}

const Keyboard: React.FC<KeyboardProps> = ({ onKeyClick }) => {
    const row1 = 'QWERTYUIOP'.split('')
    const row2 = 'ASDFGHJKL'.split('')
    const row3 = ['Enter', ...'ZXCVBNM'.split(''), 'Backspace']

    return (
        <div className='keyboard'>
            <div className='keyboard-row'>
                {row1.map((key) => (
                    <button
                    key={key}
                    onClick={() => onKeyClick(key)}
                    className='key'
                    >
                        {key}
                    </button>
                ))}
            </div>
            <div className='keyboard-row'>
                {row2.map((key) => (
                    <button
                    key={key}
                    onClick={() => onKeyClick(key)}
                    className='key'
                    >
                        {key}
                    </button>
                ))}
            </div>
            <div className='keyboard-row'>
                {row3.map((key) => (
                    <button
                    key={key}
                    onClick={() => onKeyClick(key)}
                    className={`key special ${key.toLowerCase()}`}
                    >
                        {key === 'Backspace' ? "⌫" : key}
                    </button>
                ))}
            </div>
        </div>
    )
}

export default Keyboard