<template>
    <div class="box">
      <p class="subtitle userName">{{ message.user }}</p>
      <p class="subtitle userMessage">{{ message.content }}</p>
      <p class="has-text-right userTime subtitle">{{ message.timer }}</p>
    </div>
  <div class="box">
    <p class="subtitle userName">{{ message.user }}</p>
    <p class="subtitle userMessage">{{ message.content }}</p>
    <p class="has-text-right userTime subtitle">{{ message.timer }}</p>
  </div>
</template>

<script>

export default {
  data() {
    return {
      users: [],
      message: [],
    }
  },
  props: {
    message: Object
  },
  mounted(){
    if(this.message.id === socket.id){

    }
  },
  methods: {
  },
}
</script>

<style scoped>

.userMessage{
  margin: 0;
}

.userName{
  color: deepskyblue;
  margin: 0;
}

.userTime{
  font-size: 15px;
}

.box{
  margin: 5px;
  padding-block: 5px;
}

</style>