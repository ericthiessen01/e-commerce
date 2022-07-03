import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'


function App() {
  return (
    <div className="App w-full">
      <Router>
        <Nav />
        <Routes>
          <Route path='/e-commerce/' element={<Home />}/>
          <Route path='/e-commerce/About' element={<About />}/>
          <Route path='/e-commerce/Cart' element={<Cart />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
