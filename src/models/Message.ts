export class Message {
    id = '';
    username = '';
    text = '';
    timestamp = 0;
    deleted = false;

    constructor (data: any) {
        this.update(data);
    }

    update(data: any) {
        this.id = data.id;
        this.username = data.user;
        this.text = data.text;
        this.timestamp = data.timestamp;
        this.deleted = data.deleted === true;
    }
}
