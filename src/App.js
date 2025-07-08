
import './App.css';


import Navbar from './components/Navbar';
import Statistics from './components/Statistics';
import ShortRedirect from './components/ShortRedirect';
import Home from './components/Home';
import Footer from './components/footer/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/s/:id" element={<ShortRedirect />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
