<template>
  <div>
    <v-card>
      <v-text-field label="Container Id" v-model="containerId"></v-text-field>
    </v-card>
    <v-btn @click="getContainerById()">Find Container</v-btn>

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

var orderToPackage = ref(null)
var containerId = ref(null)
var unselectedOrderToPackageDialog = ref(false)

function getContainerById() {
  GetOrderByContainerId(containerId.value)
  .then(response => {
    openSelectionDialog(response.data)
  })
}
function updateOrderDetail(orderDetail) {
  UpdateOrderDetail(orderDetail)
  .then(response => {
    beginPackagingProcess(response.data)
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
function openSelectionDialog(responseData) {
  orderToPackage.value = responseData
  unselectedOrderToPackageDialog.value = true
}
function beginPackagingProcess(responseData) {
  unselectedOrderToPackageDialog.value = false
}
function orderIdTitle(orderId) {
  return "Order Id: " + orderId
}
</script>

<style scoped>
</style>