import React from 'react'
import Letter, { LetterStatus } from '../Letter/Letter.tsx'
import './Row.css'

interface RowProps {
    guess: string
    result: LetterStatus[]
    isActive: boolean
}

const WORD_LENGTH = 5

const Row: React.FC<RowProps> = ({ guess, result, isActive }) => {
    const letters = guess.split('')
    const emptyCells = Array.from( {length: WORD_LENGTH - letters.length }, () => '')
    const allLetters = [...letters, ...emptyCells]

    return (
        <div className={`row ${isActive ? 'active' : 'inactive'}`}>
            {allLetters.map((char, index) => (
                <Letter 
                key={index} 
                char={char} 
                status={result[index] || 'default'}
                />
            ))}
        </div>
    )
}

export default Row