import './App.css';
import { useGlobalContext } from './Context';
import Favourtite from './components/Favourtite';
import Meals from './components/Meals';
import Modal from './components/Modal';
import Search from './components/Search';

function App() {
  const {showModal, favourites} = useGlobalContext()
  return (
    <main>
      <Search />
      {favourites.length > 0 && <Favourtite />}
      <Meals />
      {showModal && <Modal />}
    </main>
  );
}

export default App;
