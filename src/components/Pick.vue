<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Pick By Search" v-model="genericId"></v-text-field>
      </v-card>
      <v-btn @click="getItemContainerRelationship(genericId)">Search</v-btn>
      
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
            <v-btn @click="acknowledgeOrder()">Begin Picking</v-btn>
          </v-card>
        </v-dialog>
      </div>

      <v-list v-if="orderToPickFrom && !unacknowledgedOrderDialog">
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(orderToPickFrom.orderDetail.orderId)"></v-list-item>
          </template>

          <v-list-item v-for="item in orderToPickFrom.items" :key="item.itemId" :title="item.name" @click="getItemContainerRelationship(item.itemId)">
            <template v-slot:append v-if="item.eventType == 422">
              <svg-icon type="mdi" :path="mdiCheckCircleOutline"></svg-icon>
            </template>
          </v-list-item>
          
        </v-list-group>
      </v-list>

    </div>
    <div>
      <v-dialog
        v-model="itemContainerData"
        width="auto"
      >
        <v-card v-if="itemContainerData"
          max-width="400"
          :text="itemContainerData.item.description"
          :title="itemContainerData.item.name"
        >
          Container Id: {{ itemContainerData.container.containerId }}
          Container Name: {{ itemContainerData.container.name }}
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
var itemContainerData = ref(null)
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

function getItemContainerRelationship(idToSearch) {
  axios.get('https://localhost:7187/WMS/GetItemContainerRelationship/' + idToSearch)
  .then(response => itemContainerData.value = response.data)
}
function pickItemFromContainer() {
  axios.post('https://localhost:7187/Pick/PickItem/', itemContainerData.value.container)
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
function resetAllPickData(responseData) {
  genericId.value = 0,
  itemContainerData.value = null
  
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
