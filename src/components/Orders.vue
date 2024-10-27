<template>
  <div>
    <div>
      <v-btn @click="addNewOrder">Create Order</v-btn>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="order in allOrders" :key="order.id" :title="order.id" :text="order.dateTimeOrderRecieved">
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div>
      <v-btn @click="getAllItems">Get All Items</v-btn>
      <v-expansion-panels variant="accordion">
        <v-expansion-panel v-for="item in allItems" :key="item.id" :title="item.id" :text="item.name">
          <v-btn @click="addItemToOrder(item)">Add To Order</v-btn>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>
  
<script>
import axios from 'axios'

export default {
  data() {
    return {
      allOrders: null,
      allItems: null,
      newOrderItems: []
    }
  },
  methods: {
    getAllItems() {
      axios.get('https://localhost:7187/Item/GetAllItems/')
      .then(response => this.allItems = response.data)
    },
    getAllOrders() {
      axios.get('https://localhost:7187/Item/GetAllOrders/')
      .then(response => this.allOrders = response.data)
    },
    addNewOrder() {
      axios.post('https://localhost:7187/Item/CreateOrder/', this.newOrderItems)
      .then(response => console.log(response))
    },
    addItemToOrder(item) {
      this.newOrderItems.push(item)
      console.log(this.newOrderItems)
    }
  },
  mounted() {
    this.getAllOrders()
  }
}
</script>

<style scoped>
</style>
  