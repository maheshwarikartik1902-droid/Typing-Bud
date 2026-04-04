import { useState } from 'react'
import './App.css'
import { GlobalStyles } from './styles/global.js';
import TypingBox from './components/TypingBox';
import UpperMenu from './components/UpperMenu';


function App() {
  const [count, setCount] = useState(0);
  
  return (
    <>
    <GlobalStyles />

    <div className='canvas'>
      <div className='header'>
        <h1>Typing Bud</h1>
      </div>
      <TypingBox />
      <div className='footer'>
        <p>footer</p>
      </div>
    </div>
    </>
  )
}

export default App
