<template>
  <div>
    <div>
      <v-btn @click="getAllItems">Create Order</v-btn>

      <v-dialog v-model="allItems">
        <v-card>
          <v-list>
            <v-list-item v-for="item in allItems" :key="item.id" :title="item.name"><v-btn @click="addItemToOrder(item)">Add To Order</v-btn></v-list-item>
          </v-list>
          <v-btn @click="createNewOrder">Create New Order</v-btn>
        </v-card>
      </v-dialog>

      <v-list>
        <v-list-group v-for="order in allOrders" :key="order.id">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(order.id)"></v-list-item>
          </template>
          <v-list-item v-for="item in order.orderItems" :key="item.id" :title="item.name"></v-list-item>
        </v-list-group>
      </v-list>

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
      newOrderItems: [],
    }
  },
  methods: {
    getAllItems() {
      axios.get('https://localhost:7187/WMS/GetAllItems/')
      .then(response => this.allItems = response.data)
    },
    getAllOrders() {
      axios.get('https://localhost:7187/WMS/GetAllOrders/')
      .then(response => this.allOrders = response.data)
    },
    createNewOrder() {
      axios.post('https://localhost:7187/WMS/CreateOrder/', this.newOrderItems)
      .then(this.allItems = null)
    },
    addItemToOrder(item) {
      this.newOrderItems.push(item)
    },
    orderIdTitle(orderId) {
      return "Order Id: " + orderId
    }
  },
  mounted() {
    this.getAllOrders()
  }
}
</script>

<style scoped>
</style>
  