import { FireChat } from '../services/Firechat';
import { Message } from '../models/Message';

export default {
  state: () => {
    return {
        messages: Array<Message>()
    };
  },
  mutations: {
    addMessage(state: any, message: Message ) {
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
    messages(state: any) {
      return state.messages.filter((message: Message) => !message.deleted).sort((a: Message, b: Message) => { return a.timestamp > b.timestamp ? -1 : 1 });
    }
  },
  namespaced: true
};
