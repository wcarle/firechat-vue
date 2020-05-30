<template>
    <li v-if="!message.deleted" :id="message.id">
        <button @click="remove">X</button><span> {{ message.username ? message.username : 'Anon' }}: {{ message.text }}</span>
    </li>
</template>

<script>
import { Message } from '@/models/Message'
import { firechat } from '@/services/Firechat'

/**
 * Individual message component
 */
export default {
    name: 'Message',
    props: {
        id: {
            type: String,
            required: true
        },
        message: {
            type: Message,
            required: true,
        }
    },
    methods: {
        /**
         * Tell the parent room component to remove this message
         */
        remove() {
            this.$emit('remove', this.id)
        }
    }
}
</script>
