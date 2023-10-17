import {View} from 'react-native';
import React, {memo, useEffect} from 'react';
import {RootStackScreenProps} from '../navigator/stacks';
import {ROUTE_KEY} from '../navigator/routers';

const Splash = (props: RootStackScreenProps<'Splash'>) => {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate(ROUTE_KEY.Onboarding);
    }, 1000);
  }, []);

  return <View />;
};
export default memo(Splash);
