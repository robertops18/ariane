import * as firebase from "react-native-firebase";
import { NotificationOpen, Notification } from "react-native-firebase";

class Firebase{

    async registerToken(){
        return await firebase.messaging().getToken();
    }

    async hasPermissions(){
        return await firebase.messaging().hasPermission();
    }

    async requestPermissions(){
        try {
            await firebase.messaging().requestPermission();
            console.log("user Authorization")
        } catch (error) {
            // User has rejected permissions
        }
    }
}

export default new Firebase;