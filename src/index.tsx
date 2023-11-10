import {NavigationContainer, NavigationContainerRef, NavigationState} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Spinner from './components/spinner';
import {RootStackScreensParams} from './navigator/params';
import Stacks from './navigator/stacks';
import store, {persistor} from './stores/store/store';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {CHANNEL_ID} from './constants/constants';

const App = () => {
	const navigationRef = useRef<NavigationContainerRef<RootStackScreensParams>>(null);

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

	useEffect(() => {
		notifee.createChannel({
			id: CHANNEL_ID,
			importance: AndroidImportance.HIGH,
			name: CHANNEL_ID,
			sound: 'custom_sound',
		});
	}, []);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer ref={navigationRef} onStateChange={screenTracking}>
					<Stacks />
					<Spinner />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
};

export default App;
