import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './AppNavigator';
import { persistor, store } from '../store/configureStore';


export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <AppNavigator />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}
