import './App.css'
import Landing from './pages/Landing';
import Login from './pages/Login';
import ShoppingList from './pages/ShoppingList';
import { Routes, Route } from 'react-router-dom';
import Account from './pages/Account';
import { useState } from 'react';

// help on Router: https://hygraph.com/blog/routing-in-react
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const updatedIsAuthenticated = (authStatus) => {
    setIsAuthenticated(authStatus);
  }
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Login' element={<Login updatedIsAuthenticated={updatedIsAuthenticated} />} />
        <Route path='/ShoppingList' element={<ShoppingList isAuthenticated={isAuthenticated} updatedIsAuthenticated={updatedIsAuthenticated} />} />
        <Route path='/Account' element={<Account isAuthenticated={isAuthenticated} updatedIsAuthenticated={updatedIsAuthenticated} />} />

      </Routes>
    </>
  );
}

export default App;
