<template>
  <template v-if="connected == false">
    <input type="text" v-model="channelName" required />
    <button @click="createChannel">Create channel</button>
    {{ error }}
  </template>
  <template v-else>
    <div>
        <h1> Channel: {{ channel.name }}</h1>
        <br />
        <h2>Hash: {{ channel.hash }}</h2>
        <br />
        Send message:
    </div>
    <br />
    <input type="text" v-model="message" required />
    <br />
    <button @click="createMessage">Send</button>
    <br />
    <template v-for="message in messages" :key="message.hash">
      <div>
        {{ message.text }} -
        {{ message.timestamp }}
      </div>
      <br />
    </template>
  </template>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      connected: false,
      message: '',
      channelName: '',
      channel: null,
      error: null,
      messages: []
    }
  },
  methods: {
    async createChannel() {
      try {
        const response = await axios({
          url: 'http://localhost:8080/graphql',
          method: 'post',
          data: {
            query: `
                mutation addChannel {
                    createChannel(channel: {
                        name: "${this.channelName}"
                    })
                    {
                        name
                        hash
                    }
                }
            `
          }
        })
        this.channel = response.data.data.createChannel
        if (this.channel.hash != null) {
          this.connected = true
          this.getMessages()
        }
      } catch (error) {
        this.connected = false
        this.error = error
      }
    },
    async createMessage() {
      try {
        const response = await axios({
          url: 'http://localhost:8080/graphql',
          method: 'post',
          data: {
            query: `
                mutation addMessage {
                    createMessage(
                        text : "${this.message}"
                        userHash: "12345678"
                        channelHash: "${this.channel.hash}"
                    )
                    {
                        text
                        hash
                        timestamp
                        user {
                            hash
                        }
                        channel{
                            hash
                        }
                    }
                }
            `
          }
        })
        console.log(response.data.data.createMessage)
        this.getMessages()
      } catch (error) {
        this.error = error
      }
    },
    async getMessages() {
      try {
        const response = await axios({
          url: 'http://localhost:8080/graphql',
          method: 'post',
          data: {
            query: `
                query getMessages {
                    getMessages(channelHash: "${this.channel.hash}") {
                        text
                        hash
                        timestamp
                    }
                }
            `
          }
        })
        this.messages = response.data.data.getMessages
        this.ajustTimestamp()
      } catch (error) {
        this.error = error
      }
    },
    ajustTimestamp() {
      this.messages.forEach((message) => {
        const original = message.timestamp
        const dataObj = new Date(original)
        const hour = String(dataObj.getUTCHours()).padStart(2, '0')
        const minute = String(dataObj.getUTCMinutes()).padStart(2, '0')
        const second = String(dataObj.getUTCSeconds()).padStart(2, '0')
        message.timestamp = `${hour}:${minute}:${second}`
      })
    }
  }
}
</script>

<style scoped></style>
