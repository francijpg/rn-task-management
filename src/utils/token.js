import AsyncStorage from '@react-native-async-storage/async-storage';
import {TOKEN} from '../constants/token';

export const setToken = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(TOKEN, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(TOKEN);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};
