<template>
  <div class="app ">
    <div class="columns columnsBack">
      <div class="column is-2 usersColumn">
        <div class=" section columns is-mobile is-half is-vcentered userWelcome">
          <div class="column is-mobile has-text-centered has-text-light ">
            <h2 class="box is-mobile">Olá {{ person }}</h2>
          </div>
        </div>
        <div class="onlineUsers">
          <div class=" section columns is-mobile is-half is-vcentered onlineText">
            <div class="column has-text-centered has-text-light">
              <h2>Online:</h2>
            </div>
          </div>
          <div class="section is-mobile is-half is-vcentered usersOnline">
            <div class=" is-mobile is-half has-text-centered">
              <div class="userOnline is-mobile">
                 <div class="onlineUsersName" v-for="user in allOtherUsers">
                   <p class="usersNameBox"><div class="onlineCircle"/>{{ user.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="avalibleRooms">
          <div class=" section columns is-mobile is-half is-vcentered roomText">
            <div class="column has-text-centered has-text-light ">
              <h2>Salas:</h2>
            </div>
          </div>
          <div class="section is-mobile is-half is-vcentered avalibleRoom">
            <div class=" is-mobile is-half has-text-centered">
              <div v-for="room in rooms">
                <button @click="roomJoin(general)" class="button is-rounded chatButtons">{{room}}</button>
              </div>

              <div>
                <button @click="roomJoin(create)" class="button is-rounded createRoom">Criar sala</button>
              </div>
            </div>
          </div>
        </div>
        <div class="logout">
          <div class=" section columns is-mobile is-half is-vcentered roomText">
            <div class="column has-text-centered has-text-light ">
              <button @click="getOut()" class="button is-rounded logoutButton">Logout</button>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-10 chatColum ">
        <div class=" section columns is-mobile is-half ">
          <div class=" is-mobile is-half messagesSection">
            <div class="singleMessage" v-for="message in allMessages">
              <MessageChat :message="message" />
            </div>
          </div>
        </div>
        <div class=" section columns is-mobile is-half is-centered footer-chat">
          <div class="column is-mobile is-half ">
            <div class="columns">
              <input @keydown.enter="sendMsg" v-model="userMessage" class="input sendMessage" type="text">
              <button @click="sendMsg(userMessage)" class="button sendMessage ">-></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { userConnectionMixin } from "@/userConnectionMixin";
import MessageChat from "../components/MessageChat.vue";
export default {
  mixins: [userConnectionMixin],
  name: "RoomsView",
  components: { MessageChat },
};
</script>

<style scoped>
.columnsBack{
  margin-top: 0;
}

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
  color: #50f550;
}

.onlineCircle{
  height: 5px;
  width: 5px;
  border-radius: 50px;
  background-color: #50f550;

}

.onlineUsersName{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.userOnline {
  display: flex;
  flex-direction: column ;
  padding: 10px;
  border: white solid 2px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  max-height: 100px;
  overflow: auto;
}

.avalibleRoom{
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding-block: 10px;
  max-height: 280px;
  overflow-y: auto;
}

.createRoom , .chatButtons , .logoutButton{
  width: 100%;
  max-width: 80px;
  overflow: hidden;
}

.chatButtons{
  margin: 5px;
}

.createRoom{
  color: black;
  margin-top: 20px;
  background-color: deepskyblue;
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

.logout{
  margin-top: 40px;
}

.logoutButton{
  background-color: darkred;
  color: white;
}

.messagesSection::-webkit-scrollbar {
  display: none;
}

.messagesSection {
  max-height: 800px;
  overflow: auto;
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