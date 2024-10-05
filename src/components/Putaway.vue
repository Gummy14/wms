<template>
  <div>
    <v-card v-for="item in itemsToPutaway" :key="item.Id">
      <v-text-field label="Item Name" v-model="item.name"></v-text-field>
      <v-text-field label="Item Description" v-model="item.description"></v-text-field>
      <v-text-field label="Item Quantity" v-model="item.quantity"></v-text-field>
    </v-card>
    <v-btn @click="addItemsToPutaway">Add Another Item to Putaway Queue</v-btn>
    <v-btn @click="addItemDataToDatabase">Putaway All in Queue</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      itemsToPutaway: []
    }
  },
  methods: {
    addItemDataToDatabase() {
      axios.post('https://localhost:7187/Item/AddItemData', this.itemsToPutaway)
      .then(response => console.log(response))
      .then(this.itemsToPutaway = [])
    },
    addItemsToPutaway() {
      var itemData = {
        name: "",
        description: "",
        quantity: 0
      }

      this.itemsToPutaway.push(itemData)
    }
  },
  mounted() {
    axios.get('https://localhost:7187/Item/GetAllItems')
    .then(response => console.log(response))
  }
}
</script>

<style scoped>
</style>
