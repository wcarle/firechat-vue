/**
 * An individual message in a chat room
 */
export class Message {
    id = '';
    username = '';
    text = '';
    timestamp = 0;
    deleted = false;

    constructor (data: any) {
        this.update(data);
    }

    /**
     * Update the data of this message
     */
    update(data: any) {
        this.id = data.id;
        this.username = data.user;
        this.text = data.text;
        this.timestamp = data.timestamp;
        this.deleted = data.deleted === true;
    }
}
