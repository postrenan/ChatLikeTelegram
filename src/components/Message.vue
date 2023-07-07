<template>
    <div class="box">
      <p class="subtitle">{{ message.user }}</p>
      <p class="title">{{ message.content }}</p>
      <p class="subtitle">{{ message.timer }}</p>
    </div>
</template>

<script>
import {userConnectionMixin} from "@/userConnectionMixin";

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
    this.users = this.message.user

  },
  methods: {
  },
}
</script>

<style scoped>

</style>