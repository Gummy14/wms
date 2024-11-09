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
        <v-list-group v-for="order in allOrders" :key="order.orderId">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(order.orderId)" :subtitle="orderStatusText(order.orderStatus)"></v-list-item>
          </template>
          <v-list-item v-for="item in order.items" :key="item.id" :title="item.name"></v-list-item>
        </v-list-group>
      </v-list>

    </div>
  </div>
</template>
  
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'


var allOrders = ref(null)
var allItems = ref(null)
var newOrderItems = ref([])

function getAllItems() {
  axios.get('https://localhost:7187/WMS/GetAllItems/')
  .then(response => allItems.value = response.data)
}
function getAllOrders() {
  axios.get('https://localhost:7187/WMS/GetAllOrders/')
  .then(response => allOrders.value = response.data)
}
function createNewOrder() {
  axios.post('https://localhost:7187/WMS/CreateOrder/', newOrderItems.value)
  .then(allItems.value = null)
}
function addItemToOrder(item) {
  newOrderItems.value.push(item)
}
function orderIdTitle(orderId) {
  return "Order Id: " + orderId
}
function orderStatusText(orderStatus) {
  switch(orderStatus) {
    case 7:
      return "Order Awaiting Action"
    case 8:
      return "Order Items Picking In Progress"
  }
}

onMounted(() => {
  getAllOrders()
})
</script>

<style scoped>
</style>
  