import './App.css';

import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';

function App() {
  return (
    <div className="App grid grid-rows-[auto_1fr_auto] h-full justify-items-center gap-y-4 bg-stone-50">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
