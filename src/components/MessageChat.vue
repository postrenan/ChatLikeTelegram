<template>
  <div>
    <div class="box onlyMessage">
      <p class="subtitle userName">{{ message.user }}</p>
      <p class="subtitle userMessage" >{{ message.content }}</p>
      <p class="has-text-right userTime subtitle">{{ message.timer }}</p>
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
  mounted() {
    if (this.message.id === this.socket.id) {
    let userMessage = document.getElementsByClassName('onlyMessage');
    console.log('aaaa');
    }
  }
};
</script>

<style scoped>

.userMessage {
  margin: 0;
}

.userName {
  color: deepskyblue;
  margin: 0;
}

.userTime {
  font-size: 15px;
}

.box {
  margin: 5px;
  padding-block: 5px;
}

</style>