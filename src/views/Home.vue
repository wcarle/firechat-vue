<template>
  <div class="home">
    <form id="message-box" @submit.prevent="sendMessage">
      <input type="text" v-model="message" placeholder="Message"/><button type="submit">Submit</button>
    </form>
    <ul v-if="messages">
      <Message v-for="message in messages" :message="message" :key="message.id" :id="message.id" />
    </ul>
  </div>
</template>

<script>
import { firechat } from '@/services/Firechat';
import { mapGetters } from 'vuex';
import Message from '@/components/Message';

export default {
    name: 'Home',
    data() {
        return {
            message: ''
        };
    },
    computed: mapGetters(['messages']),
    components: {
        Message
    },
    created() {
        firechat.login();
    },
    methods: {
        sendMessage() {
            firechat.sendMessage(this.message);
            this.message = '';
        },
    }
}
</script>
