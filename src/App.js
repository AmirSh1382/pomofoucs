import React from 'react';

// Components
import Landing from './components/Landing';

import { Provider } from 'react-redux';
import store from "./redux/store"

const App = () => {
  return (
    <Provider store={store}>
      <Landing />
    </Provider>
  );
};

export default App;