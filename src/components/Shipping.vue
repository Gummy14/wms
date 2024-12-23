<template>
  <div>
    <v-card>
      <v-text-field label="Order Id" v-model="orderId"></v-text-field>
    </v-card>
    <v-btn @click="getOrderById()">Find Order</v-btn>

    <v-btn v-if="orderToShip && !unselectedOrderToShipDialog" @click="shipOrder()">Ship Order</v-btn>

    <v-dialog
      v-model="unselectedOrderToShipDialog"
      width="auto"
    >
      <v-card v-if="orderToShip"
        max-width="400"
        :title="orderIdTitle(orderToShip.orderDetail.orderId)"
        :subtitle="orderToShip.orderDetail.orderStatusDateTime"
      >
      <v-list>
        <v-list-item v-for="item in orderToShip.items" :key="item.itemId" :title="item.name"></v-list-item>
      </v-list>
      <v-btn @click="selectForShipping()">Select For Shipping</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
// import { GetAllWarehouseRelationshipsByParentId, UpdateWarehouseObject } from '@/functions/functions'

// var orderId = ref(null)
// var unselectedOrderToShipDialog = ref(false)
// var orderToShip = ref(null)

// function getOrderById() {
//   GetAllWarehouseRelationshipsByParentId(orderId.value)
//   .then(response => {
//     orderToShip.value = response.data
//     unselectedOrderToShipDialog.value = true
//   })
// }
// function updateOrderDetail(orderDetail) {
//   UpdateWarehouseObject(orderDetail)
//   .then(() => {
//     unselectedOrderToShipDialog.value = false
//   })
// }
// function shipOrder() {
//   orderToShip.value.orderDetail.orderStatus = 710
//   updateOrderDetail(orderToShip.value.orderDetail)
// }
// function selectForShipping() {
//   orderToShip.value.orderDetail.orderStatus = 620
//   updateOrderDetail(orderToShip.value.orderDetail)
// }
// function orderIdTitle(orderId) {
//   return "Order Id: " + orderId
// }
</script>

<style scoped>
</style>