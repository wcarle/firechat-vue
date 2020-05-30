import firebase from 'firebase';
import { firechat } from '@/services/Firechat';
import { FireChat } from '@/services/Firechat';
import 'firebase/database';
import store from '../store'
import roomModule from '../store/RoomModule';

export class Room {

    public static TABLE_NAME = 'messages'
    name = '';
    database: firebase.database.Database;
    ref: firebase.database.Reference;

    /**
     * Create a new chat room
     * @param name name of this room
     * @param database firebase database reference
     */
    constructor (name: string, database: firebase.database.Database) {
        this.name = name;
        this.database = database;
        this.ref = database.ref(`${Room.TABLE_NAME}-${name}`);
        store.registerModule(name, roomModule);
        this.ref.limitToLast(FireChat.MESSAGE_COUNT).on('child_added', function (data) {
            const val = data.val();
            val.id = data.key;
            store.commit(`${name}/addMessage`, val);
        });
        this.ref.limitToLast(FireChat.MESSAGE_COUNT).on('child_changed', function(data){
            const val = data.val();
            val.id = data.key;
            store.commit(`${name}/addMessage`, val);
        });
    }
    /**
     * Send a message to this room
     * @param text Message text
     */
    sendMessage(text: string) {
        return this.ref.push({
            user: firechat.user.name,
            text: text,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        });
    }
    /**
     * Remove a message from this room (soft delete)
     * @param id message ID
     */
    removeMessage(id: string) {
        return this.ref.child(id).update({ deleted: true });
    }
}
