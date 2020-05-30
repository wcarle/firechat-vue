import firebase from 'firebase';
import store from '../store'
import 'firebase/database';

export class FireChat {

    public static MESSAGE_COUNT = 10;

    user: any = {
        uid: 1,
        name: 'Will'
    };

    initialized = false;
    database: firebase.database.Database;
    messages: firebase.database.Reference;
    userRef: any = null;

    constructor () {
        const config = {
            apiKey: "AIzaSyBFpeV5miEGd5tRjjLzfuNtyLH8DiqcUFA",
            authDomain: "games-chat-test.firebaseapp.com",
            databaseURL: "https://games-chat-test.firebaseio.com",
        };
        if (!this.initialized) {
            firebase.initializeApp(config);
            this.initialized = true;
        }
        this.database = firebase.database();
        this.messages = this.database.ref('messages-main');

        this.messages.limitToLast(FireChat.MESSAGE_COUNT).on('child_added', function (data) {
            const val = data.val();
            val.id = data.key;
            store.commit('addMessage', val);
        });
    }

    login () {
        // TBD;
    }
    sendMessage (text: string) {
        return this.messages.push({
            user: this.user.name,
            text: text,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
}

export const firechat = new FireChat();
