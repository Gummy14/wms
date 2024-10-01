<template>
  <div>
    <v-card
      v-for="item in allItems"
      :key="item.id"
      :title="item.name"
      :subtitle="itemQuantity(item.quantity)"
      :text="item.description"
      variant="tonal"
    >
      <v-card-actions>
        <v-btn @click="pickItemFromInventory(item)">Pick</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      allItems: {}
    }
  },
  methods: {
    pickItemFromInventory(item) {
      axios.post('https://localhost:7187/Item/PickItem', item)
      .then(response => console.log(response))
    },
    itemQuantity (itemQuantity) {
        return "Item Quantity: " + (itemQuantity)
    },
    getAllItemData() {
      axios.get('https://localhost:7187/Item/GetAllItems')
      .then(response => this.allItems = response.data)
    }
  },
  mounted() {
    this.getAllItemData()
  }
}
</script>

<style scoped>
</style>
