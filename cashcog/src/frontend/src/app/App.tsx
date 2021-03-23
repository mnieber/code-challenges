import React from 'react';

import './App.scss';
import { UrlRouter } from 'src/app/components/UrlRouter';

function App() {
  return (
    <div className="App w-screen">
      <header className="App-header px-4">
        <UrlRouter />
      </header>
    </div>
  );
}

export default App;
