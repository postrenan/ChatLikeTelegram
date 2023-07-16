<template xmlns="http://www.w3.org/1999/html">
  <div class="app ">
    <div class="columns columnsBack">
      <div class="column is-2 usersColumn">
        <div class="onlineUsers">
          <div class=" section columns is-mobile is-half onlineText">
            <div class="column has-text-centered has-text-light">
              <h2>Online:</h2>
            </div>
          </div>
          <div class="section is-mobile is-half usersOnline">
            <div class=" is-mobile is-half has-text-centered">
              <div class="userOnline is-mobile">
                <div class="onlineUsersName" v-for="user in allOtherUsers">
                  <p class="usersNameBox">
                    <div class="onlineCircle" />
                    {{ user.name }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="avalibleRooms">
          <div class=" section columns is-mobile is-half roomText">
            <div class="column has-text-centered has-text-light ">
              <h2>Salas:</h2>
            </div>
          </div>
          <div class="section is-mobile is-half avalibleRoom">
            <div class=" is-mobile is-half has-text-centered">
              <div v-for="room in rooms">
                <button @click="roomJoin(room)" class="button  chatButtons">{{ room }}</button>
              </div>
            </div>
          </div>
          <div class="section is-mobile is-half avalibleRoom">
            <div class=" is-mobile is-half has-text-centered">
              <div>
                <button @click="createRoom()" class="button is-success  createRoom">Criar sala</button>
              </div>
              <div>
                <button @click="getOut(userRoom)" class="button  logoutButton">Logout</button>
              </div>
            </div>
          </div>
          <div>
            <div class="is-mobile has-text-centered has-text-light userWelcomeBox">
              <h2 class="box has-text-centered is-mobile helloBox">Olá {{ person }}</h2>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-8 chatColum ">
        <div class="columns chatAlert  ">
          <span class=" column has-text-light">Voce está na sala {{ userRoom }}</span>
          <span v-if="alertMessage !== '' " class="column has-text-white has-text-right" >{{alertMessage}}</span>
        </div>
        <div class=" section onlyChat">
          <div class="messagesSection">
            <div v-for="message in allMessages">
              <MessageChat :message="message" />
            </div>
          </div>
        </div>
        <div class=" section columns is-mobile is-half is-centered footer-chat">
          <div class="column is-mobile is-half ">
            <div class="columns inputAndButton">
              <input @keydown.enter="sendMsg(userMessage)" v-model="userMessage" class="input sendMessage" type="text">
              <button @click="sendMsg(userMessage)" class="button sendMessageButton ">-></button>
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
  components: { MessageChat }
};
</script>

<style scoped>
.columnsBack {
  margin-top: 0;
  background-color: rgba(30, 31, 34, 0.75);
}

.usersColumn {
  background-color: rgba(30, 31, 34, 0.62);
  height: 100vh;
  padding: 20px 0 0 0;
}

.helloBox{
  font-size: 20px;
  display: flex;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: center;
  margin-top: 270px;
}

.userWelcomeBox{
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0;
  margin: 0;
}

.onlineText {
  padding: 0 48px 0 48px;
}

.onlineCircle {
  height: 8px;
  width: 8px;
  border-radius: 50px;
  background-color: #50f550;
}

.onlineUsersName {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 20px;
}

.chatColum {
  height: 100vh;

}

.chatAlert{
  padding: 12px 0 12px 0;
}

.onlyChat {
  max-width: 100%;
  max-height: 800px;
  padding: 0 48px 0 48px;
}

.usersOnline {
  padding: 0;
  margin-bottom: 10px;
  color: white;
}

.userOnline {
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: center;
  justify-content: center;
  gap: 5px;
  max-height: 100px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.avalibleRoom {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 10px;
  max-height: 380px;
  overflow-y: auto;
  overflow-x: hidden;
}

.createRoom, .chatButtons, .logoutButton {
  font-size: 20px;

  width: 100%;
  max-width: 80px;
  overflow: hidden;
  padding: 5px 10px 5px 10px;
}

.chatButtons {
  margin: 0 40px 10px 40px;
  padding: 0 50px 0 50px;
}

.createRoom {
  margin: 0 40px 10px 40px;
  padding: 0 50px 0 50px;
  color: black;
  border: none;
}

.roomText {
  padding: 0 48px 0 48px;
}


.logoutButton {
  margin: 0 40px 10px 40px;
  padding: 0 50px 0 50px;
  background-color: darkred;
  color: white;
  border: none;
}

.avalibleRoom::-webkit-scrollbar {
  display: none;
}

.messagesSection {
  max-height: 700px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.footer-chat {
  width: 100%;
  margin: 0;
  padding: 0 35% 0 0;
  height: 70px;
  position: fixed;
  bottom: 0;
}

.sendMessage {
  min-width: 100px;
  background-color: #ffffff;
  color: #000000;
}

.sendMessageButton {
  background-color: #ffffff;
  color: #000000;
  margin-left: 10px;
}

.inputAndButton{
  display: flex;
}

@media only screen and (max-width: 770px){
  .footer-chat {
    width: 100%;
    margin: 0;
    padding: 0 ;
    height: 70px;
    position: fixed;
    bottom: 0;
  }

  .usersColumn {
    background-color: hsl(250.2, 52.083333333333336%, -29.647058823529413%);
    overflow: scroll;
    max-height: 500px;
  }

  .chatColum{
    background-color: rgba(91, 9, 9, 0.78);
  }

  .helloBox{
    margin-top: 50px;
  }

  .onlyChat{
    height: 600px;
  }

}

</style>