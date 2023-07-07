<template>
  <div class="app ">
    <div class="columns">
      <div class="column is-2 usersColumn">
        <div class=" section columns is-mobile is-half is-vcentered userWelcome">
          <div class="column has-text-centered has-text-light ">
            <h2 class="box">Olá {{ person }}</h2>
          </div>
        </div>
        <div class="onlineUsers">
          <div class=" section columns is-mobile is-half is-vcentered onlineText">
            <div class="column has-text-centered has-text-light">
              <h2>Online</h2>
            </div>
          </div>
          <div class="section is-mobile is-half is-vcentered usersOnline">
            <div class=" is-mobile is-half has-text-centered">
              <div class="userOnline">
                <div v-for="user in allOtherUsers">
                  <p class="">{{ user.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="avalibleRooms">
          <div class=" section columns is-mobile is-half is-vcentered roomText">
            <div class="column has-text-centered has-text-light ">
              <h2>Salas</h2>
            </div>
          </div>
          <div class="section is-mobile is-half is-vcentered usersOnline">
            <div class=" is-mobile is-half has-text-centered">
              <div>
                <button @onclick="redirect(1)" class=" button is-rounded">General</button>
              </div>
              <div>
                <button @onclick="redirect(2)" class=" button is-rounded">Off-topic</button>
              </div>

              <div>
                <button class=" button is-rounded">Criar sala</button>
              </div>

            </div>
          </div>
        </div>
        <div class="avalibleRooms">
          <div class=" section columns is-mobile is-half is-vcentered roomText">
            <div class="column has-text-centered has-text-light ">
              <button @click="getOut()" class=" is-rounded">Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-10 chatColum ">
        <div class=" section columns is-mobile is-half ">
          <div class=" is-mobile is-half messagesSection">
            <div class="box singleMessage" v-for="message in allMessages">
              <p class="">{{ message }} <MessageBodyComponent/></p>

            </div>
          </div>
        </div>

        <div class=" section columns is-mobile is-half is-centered footer-chat">
          <div class="column is-mobile is-half ">
            <div class="columns">
              <input v-model="userMessage" class="input sendMessage" type="text">
              <button @click="sendMsg(userMessage)" class="button sendMessage ">-></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userConnectionMixin} from "@/userConnectionMixin";
import MessageBodyComponent from '../components/MessageBodyComponent.vue'

export default {
  mixins: [userConnectionMixin],
  name: 'RoomsView',
  components: {MessageBodyComponent},
  props: {
    content: String,
    user: String,
  },
  mounted() {
    this.socket.on('messageForAll', (messages) => {
      this.allMessages = messages;
    });
    this.socket.on('receivedUsers', (users) => {
      this.allOtherUsers = users;
    });
  },
  methods: {
    redirect(key) {
      this.socket.join("key");
    },
    getOut() {
      this.socket.disconnect();
      this.$router.push('/');
    }
  }
}
</script>


<style scoped>
.usersColumn {
  background-color: hsl(250.2, 52.083333333333336%, -29.647058823529413%);
  height: 100vh;
}

.userWelcome {
  padding: 24px 48px 0 48px;
}

.onlineText {
  padding: 0 48px 0 48px;
  border-top: white solid 2px;
  border-bottom: white solid 2px;
}

.usersOnline {
  padding: 10px;
  margin-bottom: 10px;
}

.userOnline {
  padding: 10px;
  border: white solid 2px;
  border-radius: 20px;
}

.roomText {
  padding: 0 48px 0 48px;
  border-top: white solid 2px;
  border-bottom: white solid 2px;
}

.chatColum {
  background-image: url('../assets/download.png');
  height: 100vh;
}

.messagesSection::-webkit-scrollbar {
  display: none;
}

.messagesSection {
  max-height: 800px;
  overflow: scroll;
}

.singleMessage {
  padding-right: 200px;
  overflow: clip;
  white-space: nowrap;
}

.footer-chat {
  width: 100%;
  margin: 0;
  padding: 0 25% 0 48px;
  height: 70px;
  position: fixed;
  bottom: 0;
}

.sendMessage {
  background-color: black;
  color: white;
}


</style>