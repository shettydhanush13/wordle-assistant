import './App.css';
import { useEffect, useState } from 'react';
const words = require('./words.json')
const all_words = require('./allWords.json')

function App() {

  const [wordOfTheDay, setWordOfTheDay] = useState('');
  const [guessedWords, setGuessedWords] = useState([])
  const [matchedLetters, setmatchedLetters] = useState([])
  const [enteredWords, setEnteredWords] = useState([{
      0: { letter: '', color: 'lightGray' },
      1: { letter: '', color: 'lightGray' },
      2: { letter: '', color: 'lightGray' },
      3: { letter: '', color: 'lightGray' },
      4: { letter: '', color: 'lightGray' }
    },
    {
      0: { letter: '', color: 'lightGray' },
      1: { letter: '', color: 'lightGray' },
      2: { letter: '', color: 'lightGray' },
      3: { letter: '', color: 'lightGray' },
      4: { letter: '', color: 'lightGray' }
    },
    {
      0: { letter: '', color: 'lightGray' },
      1: { letter: '', color: 'lightGray' },
      2: { letter: '', color: 'lightGray' },
      3: { letter: '', color: 'lightGray' },
      4: { letter: '', color: 'lightGray' }
    },
    {
      0: { letter: '', color: 'lightGray' },
      1: { letter: '', color: 'lightGray' },
      2: { letter: '', color: 'lightGray' },
      3: { letter: '', color: 'lightGray' },
      4: { letter: '', color: 'lightGray' }
    },
    {
      0: { letter: '', color: 'lightGray' },
      1: { letter: '', color: 'lightGray' },
      2: { letter: '', color: 'lightGray' },
      3: { letter: '', color: 'lightGray' },
      4: { letter: '', color: 'lightGray' }
    },
    {
      0: { letter: '', color: 'lightGray' },
      1: { letter: '', color: 'lightGray' },
      2: { letter: '', color: 'lightGray' },
      3: { letter: '', color: 'lightGray' },
      4: { letter: '', color: 'lightGray' }
    }]
  )
  const [results, setResults] = useState(words)
  const [currentWord, setCurrentWord] = useState({
    0: { letter: '', color: 'gray' },
    1: { letter: '', color: 'gray' },
    2: { letter: '', color: 'gray' },
    3: { letter: '', color: 'gray' },
    4: { letter: '', color: 'gray' }
  })
  const [correctlyPlaced, setCorrectlyPlaced] = useState([])
  const [wronglyPlaced, setWronglyPlaced] = useState([])
  const [pattern, setpattern] = useState([
    { yes: [], no: [] },
    { yes: [], no: [] },
    { yes: [], no: [] },
    { yes: [], no: [] },
    { yes: [], no: [] }
])

  const possibleWords = (one, two, three, four, five, updatedMatched) => {
      let TempResults = [...results]
      console.log(updatedMatched)
      TempResults = TempResults.filter(e => {
        let valid = false;
        for(let i=0; i< e.length; i++) {
          if(updatedMatched.includes(e[i])) {
            valid = true
          }
        }
        return valid;
      })
      TempResults = TempResults.filter(e => (one.yes.length > 0 ? one.yes.includes(e[0]) : true) && (one.no.length > 0 ? !(one.no.includes(e[0])) : true))
      TempResults = TempResults.filter(e => (two.yes.length > 0 ? two.yes.includes(e[1]) : true) && (two.no.length > 0 ? !(two.no.includes(e[1])) : true))
      TempResults = TempResults.filter(e => (three.yes.length > 0 ? three.yes.includes(e[2]) : true) && (three.no.length > 0 ? !(three.no.includes(e[2])) : true))
      TempResults = TempResults.filter(e => (four.yes.length > 0 ? four.yes.includes(e[3]) : true) && (four.no.length > 0 ? !(four.no.includes(e[3])) : true))
      TempResults = TempResults.filter(e => (five.yes.length > 0 ? five.yes.includes(e[4]) : true) && (five.no.length > 0 ? !(five.no.includes(e[4])) : true))
      return TempResults;
  }

  useEffect(() => {
    const dt = new Date();
    dt.setDate(dt.getDate() - 233);
    const a = new Date(); // Current date now.
    const b = new Date(2021, 5, 19, 0, 0, 0, 0); // Start date of wordle.
    const seconds = parseInt((a-b)/1000);
    const wordleSerialNo = Math.round(seconds/(60*60*24));
    setWordOfTheDay(words[wordleSerialNo])
    document.getElementById('input-0').focus()
  }, [])

  const enterYourWord = () => {
    const curr = Object.values(currentWord)
    const EmptyLetter = curr.filter(e => e.letter === '')
    if (EmptyLetter.length > 0) {
      alert('incomplete word')
      return;
    };
    const word = []
    const correct = [...correctlyPlaced]
    const misplaced = [...wronglyPlaced]
    curr.map((currentLetters, i) => {
      word.push(currentLetters.letter.toLowerCase())
      if(currentLetters.color === 'green') {
        correct.push({ letter: currentLetters.letter.toLowerCase(), position: i})
      }
      if(currentLetters.color === 'orange') {
        misplaced.push({ letter: currentLetters.letter.toLowerCase(), position: i})
      }
    })
    if(![...all_words, ...words].includes(word.join(''))) {
      alert('invalid word')
      return;
    }
    const entered = [...enteredWords]
    entered[guessedWords.length] = currentWord;
    const guessed = [...guessedWords]
    guessed.push(word.join(''))
    setGuessedWords(guessed)
    setEnteredWords(entered);
    setCurrentWord({
      0: { letter: '', color: 'gray' },
      1: { letter: '', color: 'gray' },
      2: { letter: '', color: 'gray' },
      3: { letter: '', color: 'gray' },
      4: { letter: '', color: 'gray' }
    })
    setCorrectlyPlaced(correct)
    setWronglyPlaced(misplaced)
    enterWord(word, correct, misplaced)
  }

  const enterWord = (word, correct, misplaced) => {
      const currPattern = [...pattern]
      const matched = [...matchedLetters]
      for(let i=0; i < correct.length; i++ ) {
          currPattern[correct[i].position].yes.push(correct[i].letter)
          matched.push(correct[i].letter)
          const index = word.indexOf(correct[i].letter);
          if (index > -1) {
              word.splice(index, 1);
          }
      }
      for(let i=0; i < misplaced.length; i++ ) {
          currPattern[misplaced[i].position].no.push(misplaced[i].letter)
          matched.push(misplaced[i].letter)
          const index = word.indexOf(misplaced[i].letter);
          if (index > -1) {
              word.splice(index, 1);
          }
      }
      const updatedMatched = [...new Set(matched)]
      setmatchedLetters(updatedMatched)
      for(let i=0; i < 5; i++ ) {
        currPattern[i].no = [ ...currPattern[i].no, ...word]
      }
      const results = possibleWords(...currPattern, updatedMatched)
      const updatedResults = results.filter(e => !guessedWords.includes(e))
      setResults(updatedResults)
      setpattern(currPattern)
      document.getElementById('input-0').focus()
  }

  const updateCurrentWord = (value, key, index) => {
    const current = {...currentWord};
    current[index][key] = value;
    setCurrentWord(current);
    if(index < 4) {
      document.getElementById(`input-${index+1}`).focus()
    }
  }

  const colorMapping = {
    orange : '#c9b458',
    green: '#6aaa64',
    gray: '#787c7e',
    lightGray: '#d3d6da'
  }

  return (
    <div className="app-container">
      <header>WORDLE ASSISTANT</header>
      <hr/>
      <ul className='box-container'>
        {enteredWords.map((word) => <li className='row-container'>
          {Object.keys(word).map(position => <span style={{ backgroundColor: colorMapping[word[position].color] }}>{word[position].letter}</span>)}
        </li>)}
      </ul>
      <div className='input-wrapper'>
        <div className='input-container'>
          {Object.keys(currentWord).map((letter, i) => <div className='guess-letter'>
            <input type='text'
              id={`input-${i}`}
              maxLength={1}
              onChange={(e) => updateCurrentWord(e.target.value, 'letter', i)}
              value={currentWord[letter].letter}
              style={{ color: colorMapping[currentWord[letter].color], borderColor: colorMapping[currentWord[letter].color] }}
            />
            <div className='guessColor-container'  onClick={(e) => updateCurrentWord(e.target.id.split('-')[0], 'color', i)}>
              <div className='guessColor' id={`green-${i}`} style={{ backgroundColor: colorMapping['green'] }}></div>
              <div className='guessColor' id={`orange-${i}`} style={{ backgroundColor: colorMapping['orange'] }}></div>
            </div>
          </div>)}
        </div>
        <button onClick={() => enterYourWord()}>ENTER WORD</button>
      </div>
      {guessedWords.length > 0 && <div className='result-wrapper'>
        <div>Possible answer : {results.length}</div>
        <div className='result-container'>
          {results.map(word => <div className='result-word'>{word}</div>)}
        </div>
      </div>}
    </div>
  );
}

export default App;
