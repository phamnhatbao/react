import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';

function App(): JSX.Element {
  return (
    <div className='App flex flex-col h-screen'>
      <Header />
      <div className='flex-1'>
        Chat windows
      </div>
      <Footer />
    </div>
  );
}

export default App;
