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

var containerToRegister = {
  name: ""
}

function addContainerToDatabase() {
  axios.post('https://localhost:7187/WMS/RegisterContainer', containerToRegister)
  .then(resetFields())
}
function resetFields() {
  containerToRegister = {
    name: ""
  }
}
</script>

<style scoped>
</style>
