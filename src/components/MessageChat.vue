<template>
  <div class="messageBox" id="allMessage">
    <div class="box message is-mobile"  >
      <p class="subtitle userName" >{{ message.user }}</p>
      <p class="subtitle userMessage" >{{ message.content }}</p>
      <p class="has-text-right userTime">{{ message.timer }}</p>
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
  created() {
    // if(this.message.id === this.socket.id){
    //   let b = document.getElementById("allMessage");
    //   b.setAttribute("style", "justify-content: end;");
    // }
  }
};
</script>

<style scoped>

.messageBox{
  display: flex;
  width: 100%;
}

.box {
  margin: 5px;
  padding-block: 5px;
  width: 50%;
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
  font-size: 15px;
  color: black;
}

</style>