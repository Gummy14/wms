<template>
  <div>
    <div>
      <v-btn @click="getAllItems()">Create Order</v-btn>

      <v-dialog v-model="allItems">
        <v-card>
          <v-list>
            <v-list-item v-for="item in allItems" :key="item.id" :title="item.name"><v-btn @click="addItemToOrder(item)">Add To Order</v-btn></v-list-item>
          </v-list>
          <v-btn @click="createNewOrder()">Create New Order</v-btn>
        </v-card>
      </v-dialog>

      <v-list>
        <v-list-group v-for="order in allOrders" :key="order.id">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(order.id)"></v-list-item>
          </template>
          <v-list-item v-for="item in order.items" :key="item.id" :title="item.name"></v-list-item>
        </v-list-group>
      </v-list>

    </div>
  </div>
</template>
  
<script setup>
import axios from 'axios'


var allOrders = null
var allItems = null
var newOrderItems = []

function getAllItems() {
  axios.get('https://localhost:7187/WMS/GetAllItems/')
  .then(response => allItems = response.data)
}
function getAllOrders() {
  axios.get('https://localhost:7187/WMS/GetAllOrders/')
  .then(response => allOrders = response.data)
}
function createNewOrder() {
  axios.post('https://localhost:7187/WMS/CreateOrder/', newOrderItems)
  .then(allItems = null)
}
function addItemToOrder(item) {
  newOrderItems.push(item)
}
function orderIdTitle(orderId) {
  return "Order Id: " + orderId
}

onMounted(() => {
  getAllOrders()
})
</script>

<style scoped>
</style>
  