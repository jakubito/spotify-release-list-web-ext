import React from 'react';
import Navbar from './Navbar';
import Content from './Content';
import SettingsModalContainer from './modals/SettingsModalContainer';
import ResetModalContainer from './modals/ResetModalContainer';

function App() {
  return (
    <div className="App has-background-black has-text-weight-semibold">
      <Navbar />
      <Content />
      <SettingsModalContainer />
      <ResetModalContainer />
    </div>
  );
}

export default App;
