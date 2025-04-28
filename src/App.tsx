// App.tsx
import React from 'react';
import TimeLine from './components/TimeLine/TimeLine';
import './App.scss'

const App: React.FC = () => {
  return (
    <div className="app">
      <TimeLine />
    </div>
  );
};

export default App;