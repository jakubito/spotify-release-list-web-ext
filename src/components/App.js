import React from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { getAnyModalVisible } from '../selectors';
import Navbar from './Navbar';
import Content from './Content';
import SettingsModalContainer from './modals/SettingsModalContainer';
import ResetModalContainer from './modals/ResetModalContainer';
import './App.css';

function App() {
  const anyModalVisible = useSelector(getAnyModalVisible);

  return (
    <div className="App has-background-black has-text-weight-semibold">
      <div className={classNames({ blur: anyModalVisible })}>
        <Navbar />
        <Content />
      </div>
      <SettingsModalContainer />
      <ResetModalContainer />
    </div>
  );
}

export default App;
