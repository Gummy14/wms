<template>
  <div>
    <v-btn @click="getAllItems()">Create Order</v-btn>
    <v-dialog v-model="allItems">
      <v-card>
        <v-text-field label="First Name" v-model="orderToRegister.address.firstName"></v-text-field>
        <v-text-field label="Last Name" v-model="orderToRegister.address.lastName"></v-text-field>
        <v-text-field label="Street" v-model="orderToRegister.address.street"></v-text-field>
        <v-text-field label="City" v-model="orderToRegister.address.city"></v-text-field>
        <v-text-field label="State" v-model="orderToRegister.address.state"></v-text-field>
        <v-text-field label="Zip" v-model="orderToRegister.address.zip"></v-text-field>
        <v-list>
          <v-list-item v-for="item in allItems" :key="item.id" :title="item.itemData[0].name"><v-btn @click="addItemToOrder(item.itemData[0])">Add To Order</v-btn></v-list-item>
        </v-list>
        <v-btn @click="registerOrder()">Create New Order</v-btn>
      </v-card>
    </v-dialog>
    <OrderList :orders="allOrders" />
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { GetAllItemsMostRecentData, GetAllOrdersMostRecentData, RegisterOrder } from '@/functions/functions'
import OrderList from '@/components/lists/OrderList.vue'

var allOrders = ref(null)
var allItems = ref(null)
var orderToRegister = ref({
  orderItems: [],
  address: {
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: ""
  }
})


function getAllItems() {
  GetAllItemsMostRecentData()
  .then(response => {
    allItems.value = response.data
  })
}
function getAllOrders() {
  GetAllOrdersMostRecentData()
  .then(response => {
    allOrders.value = response.data
  })
}
function registerOrder() {
  RegisterOrder(orderToRegister.value)
  .then(() => {
    allItems.value = null
  })
}
function addItemToOrder(item) {
  orderToRegister.value.orderItems.push(item)
}

onMounted(() => {
  getAllOrders()
})
</script>

<style scoped>
</style>
  