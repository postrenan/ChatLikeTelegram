<template>
  <div class="app">
    <div class="section columns is-mobile is-half is-centered is-vcentered">
      <div class="columns is-mobile is-half is-vcentered">
        <div class="column is-vcentered box">
          <h2 class="title">Digite um apelido</h2>
          <input class="input is-rounded" v-model="nickname" type="text"/>
          <button class="button is-rounded" @click="login(nickname)">Entrar</button>
          <p class="subtitle" v-if="erro !== null">{{ erro }}</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import RoomsComponent from "@/views/RoomsView.vue";
import {userConnectionMixin} from "@/userConnectionMixin";


export default {
  name: 'Login',
  mixins: [userConnectionMixin],
  components: {RoomsComponent},
  data() {
    return {
      nickname: '',
      erro: null,
    }
  },
  methods: {
    login(nickname) {
      if (nickname !== '') {
        this.socket.emit('userLogin', nickname);
      }
      this.socket.on('userValidation', (validation) => {
        if (validation) {
          document.cookie = `${nickname}`
          this.$router.push('/salas');
        } else {
          this.erro = "usuario existente";
        }
      });
    }
  },
}

</script>


<style scoped>

</style>