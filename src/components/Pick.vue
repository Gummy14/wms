<template>
  <div>
    <v-btn @click="getNextUnacknowledgedOrder()">Pick By Next Unacknowledged Order</v-btn>

    <v-list v-if="orderToPickFrom && !unacknowledgedOrderDialog">
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="orderIdTitle(orderToPickFrom.orderDetail.orderId)"></v-list-item>
        </template>
        <v-list-item v-for="item in orderToPickFrom.items" :key="item.itemId" :title="item.name" @click="getContainerDetail(item)">
          <template v-slot:append v-if="item.eventType == 422">
            <svg-icon type="mdi" :path="mdiCheckCircleOutline"></svg-icon>
          </template>
        </v-list-item>
      </v-list-group>
    </v-list>

    <v-dialog
      v-model="unacknowledgedOrderDialog"
      width="auto"
    >
      <v-card v-if="orderToPickFrom"
        max-width="400"
        :title="orderIdTitle(orderToPickFrom.orderDetail.orderId)"
        :subtitle="orderDateTimeSubtitle(orderToPickFrom.orderDetail.orderStatusDateTime)"
      >
        <v-list>
          <v-list-item v-for="item in orderToPickFrom.items" :key="item.itemId" :title="item.name"></v-list-item>
        </v-list>
        <v-btn @click="acknowledgeOrder()">Select Order For Picking</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="selectContainerToPickIntoDialog"
      width="auto"
    >
      <v-card>
        <v-text-field label="Container Id To Pick Into" v-model="containerIdToPickInto"></v-text-field>
      </v-card>
      <v-btn @click="selectContainer()">Select Container</v-btn>
    </v-dialog>

    <v-dialog
      v-model="containerDetailData"
      width="auto"
    >
      <v-card v-if="containerDetailData"
        max-width="400"
        :title="containerDetailData.name"
        :subtitle="containerDetailData.containerId"
      >
        <v-btn @click="pickItemFromContainer()">Pick</v-btn>
      </v-card>
    </v-dialog>
    <v-btn :disabled="!areAllItemsPicked" @click="completePicking()">All Items Picked, Move Order To Packaging</v-btn>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheckCircleOutline  } from '@mdi/js'

var genericId = ref(0)
var activeItem = ref(null)
var containerIdToPickInto = ref(null)
var containerDetailData = ref(null)
var orderToPickFrom = ref(null)
var unacknowledgedOrderDialog = ref(false)
var selectContainerToPickIntoDialog = ref(false)

const areAllItemsPicked = computed(() => {
  if(orderToPickFrom.value) {
    var allItemsPicked = true
    orderToPickFrom.value.items.forEach(item => {
      if(item.eventType != 422) {
        allItemsPicked = false
      }
    })
    return allItemsPicked
  } else {
    return false
  }
})
function getNextUnacknowledgedOrder() {
  axios.get('https://localhost:7187/Order/GetNextOrderByStatus/' + 410)
  .then(response => setOrderToPickFromDialog(response.data))
}
function updateOrderDetail(orderDetailToUpdate) {
  axios.post('https://localhost:7187/Order/UpdateOrderDetail/', orderDetailToUpdate)
  .then(response => setOrderAcknowledgementData(response.data))
}
function selectContainer() {
  axios.get('https://localhost:7187/Container/GetContainerById/' + containerIdToPickInto.value)
  .then(response => selectContainerToPickInto(response.data.containerDetail.containerId))
}
function getContainerDetail(item) {
  activeItem.value = item
  axios.get('https://localhost:7187/Container/GetContainerDetailById/' + item.containerId)
  .then(response => containerDetailData.value = response.data)
}
function pickItemFromContainer() {
  activeItem.value.containerId = containerIdToPickInto
  axios.post('https://localhost:7187/Pick/PickItem/', activeItem.value)
  .then(response => resetAllPickData(response.data))
}
function acknowledgeOrder() {
  orderToPickFrom.value.orderDetail.orderStatus = 420
  updateOrderDetail(orderToPickFrom.value.orderDetail)
}
function completePicking() {
  orderToPickFrom.value.orderDetail.orderStatus = 510
  updateOrderDetail(orderToPickFrom.value.orderDetail)
}
function setOrderToPickFromDialog(responseData) {
  orderToPickFrom.value = responseData
  unacknowledgedOrderDialog.value = true
}
function setOrderAcknowledgementData(responseData) {
  orderToPickFrom.value.orderDetail = responseData
  unacknowledgedOrderDialog.value = false
  selectContainerToPickIntoDialog.value = true
}
function selectContainerToPickInto(containerId) {
  containerIdToPickInto.value = containerId
  selectContainerToPickIntoDialog.value = false
}
function resetAllPickData(responseData) {
  genericId.value = 0,
  containerDetailData.value = null
  
  var itemIndexToUpdate = orderToPickFrom.value.items.findIndex(x => x.itemId == responseData.itemId)
  orderToPickFrom.value.items[itemIndexToUpdate] = responseData
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
