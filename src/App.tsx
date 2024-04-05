import './App.css'
import Background from './components/background/Background'
import Board from './components/game/Board';
import { Landing } from './components/landing/Landing'
import useStore from './hooks/useStore'

function App() {
  const {page} = useStore(st=>st);

  const navigation = [
    <Landing />,
    <Board />
  ]

  return (
    <>
      <Background />
      {navigation[page]}
    </>
  )
}

export default App
