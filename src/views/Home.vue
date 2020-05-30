<template>
  <div class="home">
    <div id="nav">
      <a href="javascript:void(0);" @click="switchRoom('main')" :class="room === 'main' ? 'link-active' : ''">Main</a> |
      <a href="javascript:void(0);" @click="switchRoom('mod')" :class="room === 'mod' ? 'link-active' : ''">Mod</a>
    </div>
    <Room v-show="room === 'main'" name="main"/>
    <Room v-show="room === 'mod'" name="mod"/>
  </div>
</template>

<script>
// @ is an alias to /src
import { firechat } from '@/services/Firechat';
import { mapGetters } from 'vuex';
import Room from '@/components/Room';

export default {
  name: 'Home',
  data() {
    return {
      room: 'main',
      message: ''
    }
  },
  components: {
    Room
  },
  methods: {
    switchRoom(room) {
      this.room = room;
    }
  }
}
</script>
