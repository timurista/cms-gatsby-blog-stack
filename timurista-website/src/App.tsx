import React from 'react';
import logo from './logo.svg';
import './App.scss';
import "tachyons"
import GlobalHeader from './components/glolabl-header/GlobalHeader';
import MainScreen from './components/main-screen/MainScreen';
import Footer from './components/footer/Footer';
// GlobalHe

const App: React.FC = () => {
  return (
    <div className="App App-header">
      <GlobalHeader />
      <MainScreen />
      <Footer />

    </div>
  );
}

export default App;
