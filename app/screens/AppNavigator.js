import React from 'react';
import Home from './Home';
import Detail from './Detail';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

/** Set navigation stack */
export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      headerMode={'none'}
      screenOptions={{gestureEnabled: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
