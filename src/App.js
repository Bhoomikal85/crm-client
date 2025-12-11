import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import IndexRoutes from './routes';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <IndexRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
