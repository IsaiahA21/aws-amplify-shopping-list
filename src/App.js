import './App.css'
import Landing from './pages/Landing';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';

// help on Router: https://hygraph.com/blog/routing-in-react
function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/Login' element={<Login />} />

      </Routes>
    </>
  );
}

export default App;
