<template>
  <div>
    <v-card>
      <v-text-field label="Item Name" v-model="itemToReceive.name"></v-text-field>
      <v-text-field label="Item Description" v-model="itemToReceive.description"></v-text-field>
    </v-card>
    <v-btn @click="addReceivedItemToDatabase">Receive Item</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      itemToReceive: {
        name: "",
        description: ""
      }
    }
  },
  methods: {
    addReceivedItemToDatabase() {
      axios.post('https://localhost:7187/Item/ReceiveItem', this.itemToReceive)
      .then(response => console.log(response))
      .then(this.clearItemToReceiveData)
    },
    clearItemToReceiveData () {
      for (var prop in this.itemToReceive) {
        this.itemToReceive[prop] = "";
      }
    }
  }
}
</script>

<style scoped>
</style>
