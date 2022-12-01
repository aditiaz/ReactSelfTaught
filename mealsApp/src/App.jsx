import "./App.css";
import Meals from "./components/Meals";
import Modals from "./components/Modal";
import Search from "./components/Search";
import Favorites from "./components/Favorites";
import { useGlobalContext } from "./context";

function App() {
  const { showModal, favorites } = useGlobalContext();
  return (
    <div>
      <Search />
      {favorites.length > 0 && <Favorites />}
      <Meals />
      {showModal && <Modals />}
    </div>
  );
}

export default App;
