import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import Cart from './pages/Cart'
import Footer from './components/Footer';


function App() {
  return (
    <div className="App w-full bg-slate-50 ">
      <Router>
        <Nav />
        <Routes>
          <Route path='/e-commerce/' element={<Home />}/>
          <Route path='/e-commerce/About' element={<About />}/>
          <Route path='/e-commerce/Cart' element={<Cart />}/>
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
