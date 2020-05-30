<template>
  <div class="home">
    <form id="message-box" @submit.prevent="sendMessage">
      <input type="text" v-model="message" placeholder="Message"/><button type="submit">Submit</button>
    </form>
    <ul v-if="messages">
      <Message v-for="message in messages" :message="message" :key="message.id" :id="message.id" @remove="removeMessage" />
    </ul>
  </div>
</template>

<script>
import { firechat } from '@/services/Firechat';
import { mapGetters } from 'vuex';
import Message from '@/components/Message';

/**
 * Chat room component
 */
export default {
    room: null,
    name: 'Room',
    props: {
        name: {
            type: String,
            required: true,
            default: null
        }
    },
    data() {
        return {
            message: '',
        }
    },
    components: {
        Message
    },
    computed: {
        /**
         * Get room messages from the store for this room
         */
        messages() {
            return this.$store.getters[`${this.name}/messages`];
        }
    },
    /**
     * On Create setup the chat room database
     */
    created() {
        this.room = firechat.getRoom(this.name);
        firechat.login();
    },
    methods: {
        /**
         * Send a message to the room and clear the input
         */
        sendMessage() {
            this.room.sendMessage(this.message);
            this.message = '';
        },
        /**
         * Remove a message by id
         * @param id
         */
        removeMessage(id) {
            this.room.removeMessage(id);
        }
    }
}
</script>
<style lang="scss">
    li {
        list-style: none;
    }
</style>
