<template>
  <div>
    <v-btn @click="getNextOrderToPackage()">Get Next Order To Package</v-btn>
    <v-dialog
      v-model="orderToPackage"
      width="auto"
    >
      <v-card v-if="orderToPackage"
        max-width="400"
        :title="orderIdTitle(orderToPackage.orderDetail.orderId)"
        :subtitle="orderDateTimeSubtitle(orderToPackage.orderDetail.orderStatusDateTime)"
      >
        <v-list>
          <v-list-item v-for="item in orderToPackage.items" :key="item.itemId" :title="item.name"></v-list-item>
        </v-list>
        <v-btn>Begin Packaging</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'

var orderToPackage = ref(null)

function getNextOrderToPackage() {
  axios.get('https://localhost:7187/Order/GetNextOrderByStatus/' + 510)
  .then(response => orderToPackage.value = response.data)
}
function orderIdTitle(orderId) {
  return "Order Id: " + orderId
}
function orderDateTimeSubtitle(orderEventDateTime) {
  return "Order Received: " + orderEventDateTime
}
</script>

<style scoped>
</style>