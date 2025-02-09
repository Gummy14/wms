<template>
  <div>
    <div>
      <v-btn @click="getAllItems()">Create Order</v-btn>

      <v-dialog v-model="allItems">
        <v-card>
          <v-list>
            <v-list-item v-for="item in allItems" :key="item.id" :title="item.name"><v-btn @click="addItemToOrder(item)">Add To Order</v-btn></v-list-item>
          </v-list>
          <v-btn @click="registerOrder()">Create New Order</v-btn>
        </v-card>
      </v-dialog>

      <OrderList :orders="allOrders" />

    </div>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue'
import { GetAllItems, GetAllOrders, GetAllEventTypes, RegisterOrder } from '@/functions/functions'
import OrderList from '@/components/OrderList.vue'

var allOrders = ref(null)
var allItems = ref(null)
var newOrderItems = ref([])
var eventTypes = ref(null)

function getAllItems() {
  GetAllItems()
  .then(response => {
    allItems.value = response.data
  })
}
function getAllOrders() {
  GetAllOrders()
  .then(response => {
    allOrders.value = response.data
  })
}
function getAllEventTypes() {
  GetAllEventTypes()
  .then(response => {
    eventTypes.value = response.data
  })
}
function registerOrder() {
  RegisterOrder(newOrderItems.value)
  .then(() => {
    allItems.value = null
  })
}
function addItemToOrder(item) {
  newOrderItems.value.push(item)
}

onMounted(() => {
  getAllOrders()
  getAllEventTypes()
})
</script>

<style scoped>
</style>
  