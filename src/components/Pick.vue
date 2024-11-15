<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Pick By Container Search" v-model="containerId"></v-text-field>
      </v-card>
      <v-btn @click="getContainer(containerId)">Search</v-btn>
      
      <v-btn @click="getNextUnacknowledgedOrder()">Pick By Next Unacknowledged Order</v-btn>
      <div>
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
      </div>

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

    </div>
    <div>
      <v-dialog
        v-model="container"
        width="auto"
      >
        <v-card v-if="container"
          max-width="400"
          :title="container.containerDetail.name"
          :subtitle="container.containerDetail.containerId"
        >
          <v-list-item v-for="item in container.items" :key="item.itemId" :title="item.name">
            <template v-slot:append v-if="item.eventType == 422">
              <svg-icon type="mdi" :path="mdiCheckCircleOutline"></svg-icon>
            </template>
          </v-list-item>
          <!-- <v-btn @click="pickItemFromContainer()">Pick</v-btn> -->
        </v-card>
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
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheckCircleOutline  } from '@mdi/js'

var genericId = ref(0)
var container = ref(null)
var activeItem = ref(null)
var containerDetailData = ref(null)
var orderToPickFrom = ref(null)
var unacknowledgedOrderDialog = ref(false)

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

function getContainer(containerId) {
  axios.get('https://localhost:7187/Container/GetContainerById/' + containerId)
  .then(response => container.value = response.data)
}
function getContainerDetail(item) {
  activeItem.value = item
  axios.get('https://localhost:7187/Container/GetContainerDetailById/' + item.containerId)
  .then(response => containerDetailData.value = response.data)
}
function pickItemFromContainer() {
  axios.post('https://localhost:7187/Pick/PickItem/', activeItem.value)
  .then(response => resetAllPickData(response.data))
}
function getNextUnacknowledgedOrder() {
  axios.get('https://localhost:7187/Order/GetNextOrderByStatus/' + 410)
  .then(response => setOrderToPickFromDialog(response.data))
}
function updateOrderDetail(orderDetailToUpdate) {
  axios.post('https://localhost:7187/Order/UpdateOrderDetail/', orderDetailToUpdate)
  .then(response => setOrderAcknowledgementData(response.data))
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
}
function openPickDialog(item, containerDetail) {

}
function resetAllPickData(responseData) {
  genericId.value = 0,
  container.value = null
  
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
