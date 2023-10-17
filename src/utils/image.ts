import {launchImageLibrary} from 'react-native-image-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Alert, Linking} from 'react-native';
import {IS_ANDROID} from '../constants/constants';

export const chooseImage = async () => {
  const result = await request(
    IS_ANDROID
      ? PERMISSIONS?.ANDROID?.READ_EXTERNAL_STORAGE
      : PERMISSIONS?.IOS?.PHOTO_LIBRARY,
  );

  if (result === RESULTS.DENIED) {
    return;
  }

  if (result === RESULTS.GRANTED) {
    try {
      const res = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 1,
      });

      if (res?.assets) {
        return {
          name: res.assets[0]?.fileName as string,
          height: res?.assets[0]?.height as number,
          width: res?.assets[0]?.width as number,
          uri: res?.assets[0]?.uri as string,
          type: 'image/jpg',
        };
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    Alert.alert('', 'Xin quyền vào thư viện!', [
      {
        text: 'OK',
        onPress: () => Linking.openSettings(),
      },
      {text: 'CANCEL'},
    ]);
  }
};
