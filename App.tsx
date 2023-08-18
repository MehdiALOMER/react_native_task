import React, { useEffect } from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import { Provider } from 'react-redux';
import store from '@/store';

const App = () => {

  useEffect(() => {


  }, []);


  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;