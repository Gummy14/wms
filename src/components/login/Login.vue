<template>
  <div>
    Login
    <v-text-field
      label="Email address"
      type="email"
      v-model="username"
    >
    </v-text-field>
    <v-text-field
      label="Password"
      type="password"
      v-model="password"
    >
    </v-text-field>
    <v-btn
      @click="login()"
    >
    Login
    </v-btn>
    <v-btn
      @click="register()"
    >
    Register
    </v-btn>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { firebaseAuth } from '@/firebase'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'

var username = ref(null)
var password = ref(null)

const store = useStore()

function register() {
  createUserWithEmailAndPassword(firebaseAuth, username.value, password.value)
  .then(response => {
    console.log('res', response)
    store.commit('updateUser', response.user)
  })
  .catch((error) => {
    console.log('error code', error.code);
    console.log('error message', error.message);
  });
  // router.replace('/home')
}

function login() {
  signInWithEmailAndPassword(firebaseAuth, username.value, password.value)
  .then(response => {
    console.log('res', response)
    store.commit('updateUser', response.user)
  })
  .catch((error) => {
    console.log('error code', error.code);
    console.log('error message', error.message);
  });
}
</script>

<style scoped>
</style>