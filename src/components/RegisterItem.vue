<template>
  <div>
    <v-card>
      <v-text-field label="Item Name" v-model="itemToRegister.name"></v-text-field>
      <v-text-field label="Item Description" v-model="itemToRegister.description"></v-text-field>
    </v-card>
    <v-btn @click="addReceivedItemToDatabase">Register Item</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      itemToRegister: {
        name: "",
        description: ""
      }
    }
  },
  methods: {
    addReceivedItemToDatabase() {
      axios.post('https://localhost:7187/WMS/RegisterItem', this.itemToRegister)
      .then(response => console.log(response))
      .then(this.clearitemToRegisterData)
    },
    clearitemToRegisterData () {
      for (var prop in this.itemToRegister) {
        this.itemToRegister[prop] = "";
      }
    }
  }
}
</script>

<style scoped>
</style>
