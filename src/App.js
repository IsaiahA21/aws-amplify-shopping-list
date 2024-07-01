import './App.css'
import Landing from './pages/Landing';
import Login from './pages/Login';
import ShoppingList from './pages/ShoppingList';
import { Routes, Route } from 'react-router-dom';
import Account from './pages/Account';
import { useAuth } from './hooks/AuthContext';
import ProtectedRoute from './hooks/ProtectedRoute';

// help on Router: https://hygraph.com/blog/routing-in-react
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/ShoppingList' element={<ShoppingList />} />
        <Route path='/Account' element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Account isAuthenticated={isAuthenticated} />
          </ProtectedRoute>
        } />

      </Routes>
    </>
  );
}

export default App;
