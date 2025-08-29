import './App.css';
// import { Navbar } from './components/Navbar';
import { Bodycontent } from './components/Bodycontent';
import { Footer } from './components/Footer';
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function App() {
  return (
    <div>
      {/* <Navbar></Navbar> */}
      <Bodycontent></Bodycontent>
      <Footer></Footer>
    </div>
  );
}

export default App;
