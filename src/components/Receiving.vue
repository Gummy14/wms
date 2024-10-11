<template>
  <div>
    <v-card v-for="item in itemsToReceive" :key="item.Id">
      <v-text-field label="Item Name" v-model="item.name"></v-text-field>
      <v-text-field label="Item Description" v-model="item.description"></v-text-field>
    </v-card>
    <v-btn @click="addItems">Add Item to Receiving Batch</v-btn>
    <v-btn @click="addItemDataToDatabase">Receive Items</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      itemsToReceive: [],
      putawayDialog: false
    }
  },
  methods: {
    addItemDataToDatabase() {
      axios.post('https://localhost:7187/Item/AddItemData', this.itemsToReceive)
      .then(response => console.log(response))
      .then(this.itemsToReceive = [])
    },
    addItems() {
      var itemData = {
        name: "",
        description: "",
        status: ""
      }

      this.itemsToReceive.push(itemData)
    }
  }
}
</script>

<style scoped>
</style>
