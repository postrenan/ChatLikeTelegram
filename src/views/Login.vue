<template>
  <div class="app">
    <div class="section columns is-mobile is-half is-centered columnBackground">
      <div class="columns is-mobile is-half is-centered cardInput">
        <div class="column has-text-centered is-center">
        <div>
          <h1 class="title">We Chat</h1>
          <h2 class="subtitle">Seu, meu, o nosso chat!</h2>
        </div><br>
        <div class="is-mobile has-text-centered is-center box">
          <h2 class="title">Digite um apelido</h2>
          <input @keyup.enter="login(nickname)" class="input is-rounded column" v-model="nickname" type="text" />
          <button class="button is-rounded " @click="login(nickname)">Entrar</button>
          <p class="subtitle errorMessage" v-if="erro !== null">{{ erro }}</p>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import RoomsComponent from "@/views/Rooms.vue";
import { userConnectionMixin } from "@/userConnectionMixin";

export default {
  name: "Login",
  mixins: [userConnectionMixin],
  components: { RoomsComponent },
  data() {
    return {
      nickname: "",
      erro: null
    };
  },
  methods: {
    login(nickname) {

      if (!nickname || !nickname.trim()) {
        this.erro = "Não é aceito vazio ou nicks que já existem.";
        return;
      }
      this.socket.emit("userLogin", nickname);
      this.socket.on("userValidation", (validation) => {
        if (!validation) {
          this.erro = "não é aceito vazio ou nicks que já existem";
          this.nickname = "";
          return;
        }
        document.cookie = `${nickname}`;
        this.$router.push("/salas");
      });
    }
  }
};

</script>
<style scoped>
.columnBackground {
  margin-top: 0;
}

.cardInput {
  margin-top: 280px;
}

.errorMessage {
  margin-top: 5px;
  max-width: 284px;
}

input {
  max-width: 284px;
  border: black solid 1px;
}

button {
  background-color: darkcyan;
  margin-top: 15px;
  color: white;
  border-radius: 50px;
  border: none;
}

button:hover {
  background-color: #7fe0e0;
  color: white;
}
</style>