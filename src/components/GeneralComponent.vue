<template>
  <div class="column is-10 chatColum ">
    <div class=" section columns is-mobile is-half ">
      <div class=" is-mobile is-half messagesSection">
        <div class="box singleMessage" v-for="message in allMessages">
          <p class="">{{ message }}<br></p>
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
</template>

<script>
import {userConnectionMixin} from "@/userConnectionMixin";
export default {
  mixins: [userConnectionMixin],
}
</script>


<style scoped>

</style>