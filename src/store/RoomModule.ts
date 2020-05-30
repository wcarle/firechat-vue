import { FireChat } from '../services/Firechat';
import { Message } from '../models/Message';

export default {
    state: () => {
        return {
            messages: Array<Message>()
        };
    },
    mutations: {
        /**
         * Add a message to the state, will update a message if it already exists
         * @param state vuex state
         * @param message Message object
         */
        addMessage(state: any, message: Message) {
            const existing = state.messages.find((el: Message) => el.id === message.id);
            if (existing) {
                existing.update(message);
            }
            else {
                state.messages.push(new Message(message));
                if (state.messages.length > FireChat.MESSAGE_COUNT) {
                    state.messages.shift();
                }
            }
        }
    },
    actions: {
    },
    getters: {
        /**
         * Get all messages in this room that aren't deleted, sorted by date posted
         * @param state Vuex state
         */
        messages(state: any) {
            return state.messages
                .filter((message: Message) => !message.deleted)
                .sort((a: Message, b: Message) => { return a.timestamp > b.timestamp ? -1 : 1 });
        }
    },
    namespaced: true
};
