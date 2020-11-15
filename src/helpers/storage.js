import AsyncStorage from '@react-native-async-storage/async-storage';

const prefix = '@storage_';

export const storeString = async (key, value) => {
    try {
        await AsyncStorage.setItem(prefix + key, value)
    } catch (e) {
        // saving error
    }
}

export const storeObject = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(prefix+key, jsonValue)
    } catch (e) {
        // saving error
    }
}

export const getString = async (key) => {
    try {
        const value = await AsyncStorage.getItem(prefix + key)
        if(value !== null) {
            return value;
        }
    } catch(e) {
    }
    return null;
}

export const getObject = async (key) => {

    try {
        const jsonValue = await AsyncStorage.getItem(prefix + key)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
        return null
    }
}

