import React from 'react';
import Header from './Header';
import './style.css'
import Todos from './Todos';

const App = () => {
  return (
    <div className='main-m' >
      <div className='main'>
      <Header/>
      <Todos/>
      </div>
    </div>
  );
};

export default App;