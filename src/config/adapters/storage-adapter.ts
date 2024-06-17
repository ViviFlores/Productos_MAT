//Definir una clase con adaptores para el storage
import AsyncStorage from "@react-native-async-storage/async-storage";

export class StorageAdapter {

    static async getItem(key: string): Promise<string | null> {
        try {
            const value = await AsyncStorage.getItem(key);
            return value;
        } catch (ex) {
            console.log(ex);
            return null;
        }
    }

    static async setItem(key: string, value: string) {
        try {
            await AsyncStorage.setItem(key, value);

        } catch (ex) {
            //Disparo mensaje de error
            console.log(ex);
            throw new Error(`Error setting item ${key} - ${value}`);
        }

    }
}