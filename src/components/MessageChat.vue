<template>
  <div class="messageBox" id="allMessage" :class="{ 'boxMessage': message.id === socket.id }">
    <div class="box message is-mobile">
      <p class="subtitle userName" >{{ message.user }}</p>
      <p class="subtitle userMessage" >{{ message.content }}</p>
      <p class="userTime">{{ message.timer }}</p>
    </div>
  </div>
</template>

<script>
import { userConnectionMixin } from "@/userConnectionMixin";

export default {
  mixins: [userConnectionMixin],
  props: {
    message: Object,
  },
  data(){
    return{
      personal: false,
    }
  },
};
</script>

<style scoped>
.messageBox{
  display: flex;
  width: 100%;
  justify-content: flex-start;
}

.message{
  display: flex;
  flex-direction: column;
  max-width: 50%;
}

.boxMessage {
  justify-content: flex-end;
  align-content: flex-end;
}

.box {
  margin: 5px;
  padding-block: 5px;
  min-width: 300px;
  width: auto;
  background-color: rgba(213, 199, 199, 0.76);
}

.userName {
  color: #0331e3;
  margin: 0;
}

.userMessage {
  margin: 0;
  white-space: pre-line;
  color: black;
}

.userTime {
  display: flex;
  font-size: 15px;
  color: black;
  justify-content: flex-end;
}

</style>