<template>
  <div>
    <!-- <v-card>
      <v-text-field label="Container Id" v-model="container"></v-text-field>
    </v-card>
    <v-btn @click="getContainerById()">Find Container</v-btn> -->
    <Scanner @codeScanned="(emittedData) => container = emittedData" />

    <v-btn v-if="orderToPackage && !unselectedOrderToPackageDialog" @click="packageOrder()">Package Order</v-btn>

    <v-dialog
      v-model="unselectedOrderToPackageDialog"
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
import { ref } from 'vue'
import { GetOrderByContainerId, UpdateOrderDetail } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var container = ref(null)
var unselectedOrderToPackageDialog = ref(false)
var orderToPackage = ref(null)

// function getContainerById() {
//   GetOrderByContainerId(container.value)
//   .then(response => {
//     orderToPackage.value = response.data
//     unselectedOrderToPackageDialog.value = true
//   })
// }
function updateOrderDetail(orderDetail) {
  UpdateOrderDetail(orderDetail)
  .then(() => {
    unselectedOrderToPackageDialog.value = false
  })
}
function selectForPackaging() {
  orderToPackage.value.orderDetail.orderStatus = 520
  updateOrderDetail(orderToPackage.value.orderDetail)
}
function packageOrder() {
  orderToPackage.value.orderDetail.orderStatus = 610
  updateOrderDetail(orderToPackage.value.orderDetail)
}
function orderIdTitle(orderId) {
  return "Order Id: " + orderId
}
</script>

<style scoped>
</style>