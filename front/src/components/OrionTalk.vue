<template>
  <template v-if="connected == false">
    <el-input v-model="channelName" placeholder="Nome do canal" />
    <el-button @click="createChannel">Criar canal</el-button>
    {{ error }}
  </template>
  <template v-else>
    <el-text class="mx-1" size="large">Canal: {{ channel.name }}</el-text>
    <br/>
    <el-text class="mx-1" size="large">Hash do canal: {{ channel.hash }}</el-text>
    <br/>
    <el-text class="mx-1" size="large">Usuário: {{ userName }}</el-text>
    <br/>
    <el-input v-model="message" placeholder="Mensagem" />
    <el-button @click="createMessage">Enviar</el-button>
    <br/>
    <template v-for="message in messages" :key="message.hash">
        <el-text class="mx-1">
            {{ message.user.hash }}: {{ message.text }} - {{ message.timestamp }}
        </el-text>
        <br/>
    </template>
  </template>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            endpoint: 'http://localhost:8082/graphql',
            connected: false,
            message: '',
            messages: [],
            channelName: '',
            channel: null,
            error: null,
            userName: null,
            userHash: null,
            token: null
        }
    },
    methods: {
        login() {
            let isLogged = false;
            this.userHash = sessionStorage.getItem('userHash')
            if (this.userHash != null) {
                this.userName = sessionStorage.getItem('userName')
                this.token = sessionStorage.getItem('token')
                isLogged = true
            }
            return isLogged;
        },
        async createChannel() {
            if (this.login()){
                try {
                    const response = await axios({
                        url: this.endpoint,
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + this.token
                        },
                        data: {
                            query: `
                                mutation addChannel {
                                    createChannel(
                                        channel: {
                                            name: "${this.channelName}"
                                        },
                                        user: {
                                            hash: "${this.userHash}"
                                        })
                                    {
                                        name
                                        hash
                                        user{
                                            hash
                                        }
                                    }
                                }
                            `
                        }
                    })
                    this.channel = response.data.data.createChannel
                    if (this.channel.hash != null) {
                        this.connected = true
                        // Continuos polling
                        setInterval(() => {
                            this.getMessages()
                        }, 5000)
                    }
                } catch (error) {
                    this.connected = false
                    this.error = error
                }
            }
        },
        async createMessage() {
            if (this.login()){
                try {
                    await axios({
                        url: this.endpoint,
                        method: 'post',
                        headers: {
                            'Accept': 'application/json',
                            'Authorization': 'Bearer ' + this.token
                        },
                        data: {
                            query: `
                                mutation addMessage {
                                    createMessage(
                                        text : "${this.message}"
                                        userHash: "${this.userHash}"
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
                    this.getMessages()
                } catch (error) {
                    this.error = error
                }
            }
        },
        async getMessages() {
            try {
                const response = await axios({
                    url: this.endpoint,
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': 'Bearer ' + this.token
                    },
                    data: {
                        query: `
                            query getMessages {
                                getMessages(channelHash: "${this.channel.hash}") {
                                    text
                                    hash
                                    timestamp
                                    user {
                                        hash
                                    }
                                }
                            }
                        `
                    }
                })
                this.messages = response.data.data.getMessages
                console.log(this.messages)
                this.adjustTimestamp()
            } catch (error) {
                this.error = error
            }
        },
        adjustTimestamp() {
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
