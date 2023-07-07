import io from "socket.io-client";
const socket = io('127.0.0.1:3000');
export const userConnectionMixin = {
   data() {
       return {
           socket,
           userMessage: '',
           userSendMessage: [],
           allMessages: [],
           name: '',
           users: '',
           person: document.cookie,
           allOtherUsers: [],
       }
   },
    methods: {
        sendMsg(text) {
            this.socket.emit('userMessage', text);
        },
    }
}