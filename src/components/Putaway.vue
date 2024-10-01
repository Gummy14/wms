<template>
  <div>
    <v-text-field label="Item Name" v-model="itemData.name"></v-text-field>
    <v-text-field label="Item Description" v-model="itemData.description"></v-text-field>
    <v-btn @click="addDataToDatabase">Submit</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      itemData: {
        name: '',
        description: '',
        quantity: 1
      }
    }
  },
  methods: {
    addDataToDatabase() {
      axios.post('https://localhost:7187/Item/AddItem', this.itemData)
      .then(response => console.log(response))
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
