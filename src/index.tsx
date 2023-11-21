import notifee, {AndroidImportance} from '@notifee/react-native';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {NavigationContainer, NavigationContainerRef, NavigationState} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Linking} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Spinner from './components/spinner';
import Toast from './components/toast';
import {CHANNEL_ID} from './constants/constants';
import {RootStackScreensParams} from './navigator/params';
import {ROUTE_KEY} from './navigator/routers';
import Stacks from './navigator/stacks';
import store, {persistor} from './stores/store/store';
import {getServiceDetailFromID} from './utils';

const App = () => {
	const navigationRef = useRef<NavigationContainerRef<RootStackScreensParams>>(null);

	const screenTracking = (state?: NavigationState) => {
		if (state) {
			const route = state?.routes[state.index];
			if (route.state) {
				screenTracking(route?.state as any);
				return;
			}
			console.log(`Navigation: ------> ${route?.name}`);
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

	const prefixes = ['https://srm150851.page.link'];
	const linking = {
		prefixes,
		subscribe: (listener: any) => {
			try {
				const onReceiveURL = async ({url}: {url: string}) => {
					const idService = url?.split?.('?')?.[1]?.split?.('=')?.[1];

					if (idService) {
						if (navigationRef.current?.getCurrentRoute?.()?.name == ROUTE_KEY.DetailService) {
							navigationRef.current.goBack();
						}
						const data = await getServiceDetailFromID(idService);
						navigationRef?.current?.navigate(ROUTE_KEY.DetailService, {data});
					}

					return listener(url);
				};
				const dynamicLinksListener = dynamicLinks().onLink((link: any) => {
					return onReceiveURL(link);
				});

				const sub = Linking.addEventListener('url', link => {
					if (link.url.startsWith('/link')) {
						return;
					}
					onReceiveURL(link);
				});

				return () => {
					dynamicLinksListener();
					sub.remove();
				};
			} catch (error) {}
		},
		getInitialURL: async () => {
			const dynamicLinkInitialURL = await dynamicLinks().getInitialLink();
			if (dynamicLinkInitialURL?.url) {
				return dynamicLinkInitialURL?.url;
			}
			const initialURL = await Linking.getInitialURL();
			if (!initialURL || initialURL.startsWith('/link')) {
				return;
			}
			return initialURL;
		},
	};

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<NavigationContainer linking={linking} ref={navigationRef} onStateChange={screenTracking}>
					<Stacks />
					<Spinner />
					<Toast />
				</NavigationContainer>
			</PersistGate>
		</Provider>
	);
};

export default App;
