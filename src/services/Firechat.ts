import { Room } from './Room';
import firebase from 'firebase';
import 'firebase/database';

export class FireChat {

    public static MESSAGE_COUNT = 10;

    rooms: Array<Room> = Array<Room>();

    user: any = {
        uid: null,
        name: null
    };

    initialized = false;
    database: firebase.database.Database;
    users: firebase.database.Reference;
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
        this.users = this.database.ref('users');
    }

    /**
     * Get or create a chat room
     */
    getRoom (name: string): Room {
        const existing = this.rooms.filter(room => room.name === name);
        if (existing.length > 0) {
            return existing[0];
        }
        const room = new Room(name, this.database);
        this.rooms.push(room);
        return room;
    }

    async authStateChanged (val: any) {
        // If we have a value then the user is logging in
        if (val) {
            this.user.uid = val.uid;
            this.userRef = this.users.child(this.user.uid);

            // Get the user details from the /users path in our database
            const data = await this.userRef.once('value');
            // This is the first time the user is logging in so we need to ask them to enter their name
            if (data.val() === null) {
                this.user.name = prompt("What's your name?");
                this.users.child(this.user.uid).set(this.user);
            }
            // The user has logged in before, just update their user record locally
            else {
                this.user = data.val();
            }
        }
        else {
            // User logout
        }
    }

    /**
     * Log the user in (using anonymous auth)
     */
    login () {
        firebase.auth().onAuthStateChanged((data: any) => { this.authStateChanged(data) });
        // Trigger the actual "login" here is where we'd update things with a JWT token or a social login instead of anonymous authentication
        firebase.auth().signInAnonymously().catch(function(error) {
            console.log(error.code + ': ' + error.message);
        });
    }
}

export const firechat = new FireChat();
