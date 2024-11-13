<template>
  <div>
    <v-card>
      <v-text-field label="Container Name" v-model="containerToRegister.name"></v-text-field>
    </v-card>
    <v-btn @click="addContainerToDatabase()">Register Container</v-btn>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

var containerToRegister = ref({
  name: ""
})

function addContainerToDatabase() {
  axios.post('https://localhost:7187/Container/RegisterContainer', containerToRegister.value)
  .then(resetFields())
}
function resetFields() {
  containerToRegister.value = {
    name: ""
  }
}
</script>

<style scoped>
</style>
