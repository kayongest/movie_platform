import './App.css';
import { Navbar } from './components/Navbar';
import { Bodycontent } from './components/Bodycontent';
import { Footer } from './components/Footer';

function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Bodycontent></Bodycontent>
      <Footer></Footer>
    </div>
  );
}

export default App;
