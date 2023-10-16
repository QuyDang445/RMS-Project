import ImageResizer from '@bam.tech/react-native-image-resizer';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

export const chooseImage = async () => {
	try {
		const res = await launchImageLibrary({mediaType: 'photo', selectionLimit: 1});
		if (res?.assets) {
			return {
				name: res.assets[0]?.fileName as string,
				height: res?.assets[0]?.height as number,
				width: res?.assets[0]?.width as number,
				uri: res?.assets[0]?.uri as string,
				type: 'image/jpg',
			};
		}
	} catch (error) {}
};

export const getImageFromDevice = async (numberImage = 1) => {
	try {
		const assets = await launchImageLibrary({mediaType: 'photo', selectionLimit: numberImage || 1});
		const asset = assets?.assets?.[0];

		if (asset?.uri) {
			const newImage = await ImageResizer.createResizedImage(asset.uri!, asset?.height || 500, asset?.width || 500, 'PNG', 1);
			return {uri: newImage.uri, type: asset.type, name: newImage.name};
		}
	} catch (error) {}
};

export const uploadImage = async (uri: string) => {
	try {
		const name = '' + new Date().valueOf();
		const storageRef = storage().ref().child(name);
		const response = await fetch(uri);
		const blob = await response.blob();
		await storageRef.put(blob);
		return (await storageRef.getDownloadURL()) as string;
	} catch (error) {}
};
