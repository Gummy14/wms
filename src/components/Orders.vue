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
        <v-list-group v-for="orderItems in allOrderItems" :key="orderItems.order.orderId">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(orderItems.order)" @click="getItemsForOrder(orderItems.order.orderId)"></v-list-item>
          </template>
          <v-list-item v-for="item in orderItems.items" :key="item.id" :title="item.name"></v-list-item>
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
      allOrderItems: null,
      allItems: null,
      newOrderItems: [],
    }
  },
  methods: {
    getAllItems() {
      axios.get('https://localhost:7187/WMS/GetAllCurrentItems/')
      .then(response => this.allItems = response.data)
    },
    getAllOrderItems() {
      axios.get('https://localhost:7187/WMS/GetAllCurrentOrdersWithOutItems/')
      .then(response => this.allOrderItems = response.data)
    },
    getItemsForOrder(orderId) {
      if(!this.allOrderItems.find(x => x.order.orderId === orderId).items) {
        axios.get('https://localhost:7187/WMS/GetOrderItems/' + orderId)
        .then(response => this.addItemsToOrderItems(orderId, response.data))
      }
    },
    createNewOrder() {
      axios.post('https://localhost:7187/WMS/CreateOrder/', this.newOrderItems)
      .then(this.allItems = null)
    },
    addItemToOrder(item) {
      this.newOrderItems.push(item)
    },
    orderIdTitle(order) {
      return "Order: " + order.eventDateTime + " --- " + order.orderId
    },
    addItemsToOrderItems(orderId, items) {
      this.allOrderItems.find(x => x.order.orderId === orderId).items = items
      console.log("this.allOrderItems", this.allOrderItems)
    }
  },
  mounted() {
    this.getAllOrderItems()
  }
}
</script>

<style scoped>
</style>
  