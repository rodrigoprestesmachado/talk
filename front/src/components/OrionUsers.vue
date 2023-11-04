<template>
    <template v-if="!login">
        <el-input v-model="name" placeholder="Nome" />
        <el-input v-model="email" placeholder="E-mail" />
        <el-input
            v-model="password"
            type="password"
            placeholder="Senha"
            show-password
        />
        <el-button @click="createUser">Criar usuário</el-button>
        <br/>
    </template>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
        login: false,
        name: '',
        email: '',
        password: '',
        endpoint: 'http://localhost:8080/users'
    }
  },
  methods: {
    async createUser(){
        try {
            const response = await axios({
                url: this.endpoint + '/createAuthenticate',
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            })
            if (response.data != null){
                sessionStorage.setItem('token', response.data.token);
                sessionStorage.setItem('userName', response.data.user.name);
                sessionStorage.setItem('userHash', response.data.user.hash);
                this.login = true;
            }
        } catch (error) {
            console.log(error)
        }
    }
  },
  mounted() {
    sessionStorage.setItem('token', '');
    sessionStorage.setItem('userName', '');
    sessionStorage.setItem('userHash', '');
  }
}
</script>

<style scoped></style>
