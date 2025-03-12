import React, { useState, useEffect, KeyboardEvent } from 'react'
import Row from '../Row'

const MAX_ATTEMPTS = 6
const WORD_LENGTH = 5

const correctWord = 'REACT'

export type LetterStatus = 'correct' | 'present' | 'absent' | 'default'

interface Attempt {
    guess: string
    result: LetterStatus[] 
}

const Board: React.FC = () => {
    const [attempts, setAttempts] = useState<Attempt[]>([])
    const [currentGuess, setCurrentGuess] = useState('')

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const { key } = event

        if (key === 'Backspace') {
            setCurrentGuess((prev) => prev.slice(0, -1))
            return
        }

        if (key === 'Enter') {
            if (currentGuess.length === WORD_LENGTH) {
                processGuess()
            }
            return
        }

        if (/^[a-zA-Z]$/.test(key) && currentGuess.length < WORD_LENGTH) {
            setCurrentGuess((prev) => prev + key.toUpperCase())
        }
    }

    const processGuess = () => {
        const guessUper = currentGuess.toUpperCase()
        const newResult: LetterStatus[] = []

        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessUper[i] === correctWord[i]) {
                newResult.push('correct')
            } else if (correctWord.includes(guessUper[i])) {
                newResult.push('present')
            } else {
                newResult.push('absent')
            }
        }

        setAttempts((prev) => [...prev, { guess: guessUper, result: newResult}])
        setCurrentGuess('')
    }

    useEffect(() => {
        const boardElement = document.getElementById('board-container')
        boardElement?.focus()
    }, [])

    return (
        <div
        id='board-container'
        className='board'
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{outline: 'none'}}
        >
            {attempts.map((attempt, index) => (
                <Row key={index} guess={attempts.guess} result={attempts.result} />
            ))}
            {attempts.length < MAX_ATTEMPTS && (
                <Row guess={currentGuess} result={[]}/>
            )}
        </div>
    )
}

export default Board