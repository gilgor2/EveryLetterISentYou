import React from 'react';
import AffirmationPage from './x-affirmation/page/AffirmationPage/AffirmationPage';
import AffirmationContextProvider from './x-affirmation/data/context/AffirmationContextProvider';

function App() {
	return (
  <div className="App">
    <AffirmationContextProvider>
      <AffirmationPage />
    </AffirmationContextProvider>
  </div>
	);
}

export default App;
