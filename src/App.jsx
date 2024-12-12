import { useState } from 'react'
import Header from './components/Header/Header'
import TranslationWindow from './components/TranslationWindow/TranslationWindow'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Header />

    <TranslationWindow />
{/*     
      <section className={}>

      </section> */}
       
    </>
  )
}

export default App
