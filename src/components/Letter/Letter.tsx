import React from 'react'
import './Letter.css'

export type LetterStatus = 'correct' | 'present' | 'absent' | 'default'

interface LetterProps {
    char: string
    status: LetterStatus
    isActive?: boolean
}

const Letter: React.FC<LetterProps> = ({ char, status }) => {
    return (
        <div className={`letter ${status}`}>
            {char}
        </div>
    )
}

export default Letter