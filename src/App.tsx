// App.tsx
import React from 'react';
import './App.css';
import TimeLine from './components/TimeLine/TimeLine';

const App: React.FC = () => {
  return (
    <div className="app">
      <TimeLine />
    </div>
  );
};

export default App;