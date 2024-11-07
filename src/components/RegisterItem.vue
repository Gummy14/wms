<template>
  <div>
    <v-card>
      <v-text-field label="Item Name" v-model="itemToRegister.name"></v-text-field>
      <v-text-field label="Item Description" v-model="itemToRegister.description"></v-text-field>
    </v-card>
    <v-btn @click="addReceivedItemToDatabase()">Register Item</v-btn>
  </div>
</template>

<script setup>
import axios from 'axios'

const itemToRegister = {
  name: "",
  description: ""
}

function addReceivedItemToDatabase() {
  axios.post('https://localhost:7187/WMS/RegisterItem', itemToRegister)
  .then(clearitemToRegisterData())
}
function clearitemToRegisterData() {
  for (var prop in itemToRegister) {
    itemToRegister[prop] = ""
  }
}
</script>

<style scoped>
</style>
