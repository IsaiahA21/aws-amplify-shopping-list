import './App.css'
import Landing from './pages/Landing';
import Login from './pages/Login';
import ShoppingList from './pages/ShoppingList';
import { Routes, Route } from 'react-router-dom';

// help on Router: https://hygraph.com/blog/routing-in-react
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/ShoppingList' element={<ShoppingList />} />
      </Routes>
    </>
  );
}

export default App;
