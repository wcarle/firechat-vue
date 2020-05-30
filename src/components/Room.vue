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
// @ is an alias to /src
import { firechat } from '@/services/Firechat';
import { mapGetters } from 'vuex';
import Message from '@/components/Message';

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
        messages() {
            return this.$store.getters[`${this.name}/messages`];
        }
    },
    created() {
        console.log('!!!!' + this.name);
        this.room = firechat.getRoom(this.name);
        firechat.login();
    },
    methods: {
        sendMessage() {
            this.room.sendMessage(this.message);
            this.message = '';
        },
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
