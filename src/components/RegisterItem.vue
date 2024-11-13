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
import { ref } from 'vue'

var itemToRegister = ref({
  name: '',
  description: ''
})

function addReceivedItemToDatabase() {
  axios.post('https://localhost:7187/Item/RegisterItem', itemToRegister.value)
  .then(clearitemToRegisterData())
}
function clearitemToRegisterData() {
  itemToRegister.value = {
    name: '',
    description: ''
  }
}
</script>

<style scoped>
</style>
