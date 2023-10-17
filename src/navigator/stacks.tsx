import {StyleSheet} from 'react-native';
import React from 'react';
import {RootStackScreensParams} from './params';
import {
  CardStyleInterpolators,
  createStackNavigator,
  StackNavigationProp,
  StackScreenProps,
} from '@react-navigation/stack';
import {ROUTE_KEY} from './routers';
import Splash from '../screens/splash';
import Onboarding from '../screens/onboarding';

export type RootStackScreens = keyof RootStackScreensParams;
export type RootStackScreenProps<T extends RootStackScreens> = StackScreenProps<
  RootStackScreensParams,
  T
>;

export type UseRootStackNavigation<T extends RootStackScreens = 'Splash'> =
  StackNavigationProp<RootStackScreensParams, T>;

const {Navigator, Screen} = createStackNavigator<RootStackScreensParams>();

const Stacks = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Screen name={ROUTE_KEY.Splash} component={Splash} />
      <Screen name={ROUTE_KEY.Onboarding} component={Onboarding} />
    </Navigator>
  );
};

export default Stacks;
const styles = StyleSheet.create({});
