import io from "socket.io-client";

const socket = io("127.0.0.1:3000");
export const userConnectionMixin = {

    data() {
      return {
        socket,
        userMessage: "",
        allMessages: [],
        person: document.cookie,
        allOtherUsers: [],
        rooms: [],
        roomName: "",
        userRoom: "general",
        myMessage: false
      };
    },
    mounted() {
      this.socket.on("messageForAll", (messages) => {
        this.allMessages = messages;
      });
      this.socket.on("receivedUsers", (users) => {
        this.allOtherUsers = users;
      });
      this.socket.on("receivedRooms", (rooms) => {
        this.rooms = rooms;
      });
    },
    methods: {
      sendMsg(text) {
        if (!this.userMessage || !this.userMessage.trim() || !this.userRoom) return;
        const data = {
          content: text,
          room: this.userRoom
        };
        this.socket.emit("userMessage", data);
        this.userMessage = "";
      },
      getOut(room){
        this.socket.disconnect(room);
        this.$router.push("/");
      },
      createRoom() {
        this.roomName = prompt("Voce irá criar uma sala, digite o nome dela:");
        if (this.rooms.includes(this.roomName)) {
          alert("nome de sala já em uso");
          return;
        }
        this.socket.emit("createRoom", this.roomName);
        this.socket.on("reciveNewRoomConfirmation", () => {
          this.rooms.push(this.roomName);
          alert("sala criada!");
        });
      },
      roomJoin(room) {
        if (room === this.userRoom) return;
        this.socket.emit("roomSelect", room);
        this.userRoom = room;
      }
    }

  }
;