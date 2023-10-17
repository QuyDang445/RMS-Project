import React, {useRef} from 'react';
import Stacks from './navigator/stacks';
import {RootStackScreensParams} from './navigator/params';
import {
  NavigationContainer,
  NavigationContainerRef,
  NavigationState,
} from '@react-navigation/native';

const App = () => {
  const navigationRef =
    useRef<NavigationContainerRef<RootStackScreensParams>>(null);

  const screenTracking = (state?: NavigationState) => {
    if (state) {
      const route = state?.routes[state.index];
      if (route.state) {
        screenTracking(route?.state as any);
        return;
      }
      console.log(`------> ${route?.name}`);
    }
  };

  return (
    <NavigationContainer ref={navigationRef} onStateChange={screenTracking}>
      <Stacks />
    </NavigationContainer>
  );
};

export default App;
