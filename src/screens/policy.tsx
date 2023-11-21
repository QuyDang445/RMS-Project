import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import WebView from 'react-native-webview';
import CustomHeader from '../components/custom-header';
import FixedContainer from '../components/fixed-container';
import {HTML_POLICY_EN} from '../constants/data';

const Policy = () => {
	return (
		<FixedContainer>
			<CustomHeader title="QUY ĐỊNH ĐIỀU KHOẢN" />
			<WebView
				source={{html: HTML_POLICY_EN}}
				startInLoadingState={true}
				renderLoading={() => (
					<View style={styles.loading}>
						<ActivityIndicator />
					</View>
				)}
			/>
		</FixedContainer>
	);
};

export default Policy;
const styles = StyleSheet.create({
	loading: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
});
