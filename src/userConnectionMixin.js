import io from "socket.io-client";

const socket = io("127.0.0.1:3000");
export const userConnectionMixin = {
  data() {
    return {
      socket,
      userMessage: "",
      userSendMessage: [],
      allMessages: [],
      name: "",
      users: "",
      person: document.cookie,
      allOtherUsers: [],
      user: String,
      time: null,
      message: String,
      general: 1,
      offTopic: 2,
      create: 3,
      rooms:['general', 'off-topic', ],
      createRooms: [],
      roomName:"",
      myMessage: false,
    };
  },
  mounted() {
    this.socket.on("messageForAll", (messages) => {
        this.allMessages = messages;
    });
    this.socket.on("receivedUsers", (users) => {
      this.allOtherUsers = users;
    });
  },
  methods: {
    sendMsg(text) {
      if (!this.userMessage || !this.userMessage.trim()) return;
      this.socket.emit("userMessage", text);
      this.userMessage = "";
    },
    getOut() {
      this.socket.disconnect();
      this.$router.push("/");
    },
    roomJoin(room){

      if(room === this.general || room === this.offTopic) this.socket.emit("roomSelect", room)
      if(room === this.create){
        this.roomName = prompt('Voce irá criar uma sala, digite o nome dela:');

        if(this.createRooms.includes(this.roomName)){
          alert('nome de sala já em uso')
          return;
        }
        this.createRooms.push(this.roomName);
        console.log(this.rooms );
        this.rooms.push(this.roomName);
        this.socket.emit('createRoom', this.roomName);
      }
    }
  }
};