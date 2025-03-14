import React, { useState, useEffect, KeyboardEvent } from 'react'
import './Board.css'
import Row from '../Row/Row.tsx'
import Keyboard from '../Keyboard/Keyboard.tsx'

const MAX_ATTEMPTS = 5
const WORD_LENGTH = 5

const WORDS = [
    'AMIGO', 'BOLSO', 'CAIXA', 'CARRO', 'CINZA', 'DADOS','FELIZ', 'JOVEM', 'LIVRO', 'PASTO', 'RAPAZ', 'SORTE', 'TIGRE'
]

export type LetterStatus = 'correct' | 'present' | 'absent' | 'default'

interface Attempt {
    guess: string
    result: LetterStatus[] 
}

type GameStatus = 'playing' | 'won' | 'lost';

const Board: React.FC = () => {
    const [attempts, setAttempts] = useState<Attempt[]>(
        Array.from({ length: MAX_ATTEMPTS }, () => ({ guess: '', result: []}))
    )
    const [currentGuess, setCurrentGuess] = useState('')
    const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
    const [correctWord, setCorrectWord] = useState('')
    const [currentRowIndex, setCurrentRowIndex] = useState(0)

    const getRandomWord = () => {
        const randomIndex = Math.floor(Math.random() * WORDS.length)
        return WORDS[randomIndex]
    }

    useEffect(() => {
        setCorrectWord(getRandomWord())
    }, [])

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (gameStatus !== 'playing') return

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

        const newAttempts = [...attempts]
        newAttempts[currentRowIndex] = { guess: guessUper, result: newResult}
        setAttempts(newAttempts)
        setCurrentGuess('')

        if (guessUper === correctWord) {
            setGameStatus('won')
        } else if (currentRowIndex === MAX_ATTEMPTS - 1) {
            setGameStatus('lost')
        } else {
            setCurrentRowIndex(prev => prev + 1)
        }
    }

    const restartGame = () => {
        setAttempts(Array(MAX_ATTEMPTS).fill({ guess: '', result: []}))
        setCurrentGuess('')
        setGameStatus('playing')
        setCorrectWord(getRandomWord())
        setCurrentRowIndex(0)
    }

    useEffect(() => {
        const boardElement = document.getElementById('board-container')
        boardElement?.focus()
    }, [])

    return (
        <>
        <div className='game-container'>
        {gameStatus === 'won' && (
            <div className='message'>
                <h2>Parabéns! Você acertou a palavra!</h2>
                <button onClick={restartGame}>Jogar novamente</button>
            </div>
        )}
        {gameStatus === 'lost' && (
            <div className='message'>
                <h2>Que pena! Você esgotou suas tentativas.</h2>
                <button onClick={restartGame}>Reiniciar jogo</button>
            </div>
        )}
            <div
            id='board-container'
            className='board'
            tabIndex={0}
            onKeyDown={handleKeyDown}
            style={{outline: 'none'}}
            >
            {attempts.map((attempt, index) => (
                <Row 
                key={index}
                guess={ (index === currentRowIndex && gameStatus === 'playing') ? currentGuess : attempt.guess }
                result={ (index === currentRowIndex && gameStatus === 'playing') ? [] : attempt.result }
                isActive={ (index === currentRowIndex && gameStatus === 'playing') }
                />
            ))}
            </div>
        </div>
        <Keyboard onKeyClick={(key) => {
            const event = { key }
            handleKeyDown(event as KeyboardEvent<HTMLDivElement>)
        }}/>
        </>
    )
}

export default Board
