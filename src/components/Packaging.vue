<template>
  <div>
    <v-card>
      <v-text-field label="Container Id" v-model="containerId"></v-text-field>
    </v-card>
    <v-btn @click="getContainerById()">Find Container</v-btn>

    <v-dialog
      v-model="orderToPackage"
      width="auto"
    >
      <v-card v-if="orderToPackage"
        max-width="400"
        :title="orderIdTitle(orderToPackage.orderDetail.orderId)"
        :subtitle="orderToPackage.orderDetail.orderStatusDateTime"
      >
      <v-list>
        <v-list-item v-for="item in orderToPackage.items" :key="item.itemId" :title="item.name"></v-list-item>
      </v-list>
      <v-btn @click="selectForPackaging()">Select For Packaging</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

var orderToPackage = ref(null)
var containerId = ref(null)

function getContainerById() {
  axios.get('https://localhost:7187/Order/GetOrderByContainerId/' + containerId.value)
  .then(response => orderToPackage.value = response.data)
}
function selectForPackaging() {
  orderToPackage.value.orderDetail.orderStatus = 520
  axios.post('https://localhost:7187/Order/UpdateOrderDetail/', orderToPackage.value.orderDetail)
  .then(response => console.log(response.data))
}
function orderIdTitle(orderId) {
  return "Order Id: " + orderId
}
</script>

<style scoped>
</style>