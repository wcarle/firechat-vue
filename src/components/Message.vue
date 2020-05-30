<template>
    <li v-if="!message.deleted" :id="message.id">
        <span>{{ message.username ? message.username : 'Anon' }}: {{ message.text }}</span>
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
}
</script>
