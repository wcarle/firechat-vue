import { Message } from './../models/Message';
import Vue from 'vue'
import Vuex from 'vuex'
import { FireChat } from '@/services/Firechat';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        messages: Array<Message>()
    },
    mutations: {
        addMessage(state: any, message: Message) {
            state.messages.push(new Message(message));
            if (state.messages.length > FireChat.MESSAGE_COUNT) {
                state.messages.shift();
            }
        }
    },
    actions: {
    },
    modules: {
    },
    getters: {
        messages(state: any) {
            return state.messages
                .filter((message: Message) => !message.deleted)
                .sort((a: Message, b: Message) => { return a.timestamp > b.timestamp ? -1 : 1 });
        }
    }
})
