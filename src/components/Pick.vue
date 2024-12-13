<template>
  <div>
    <v-btn @click="getNextOrderByStatus()">Pick By Next Unacknowledged Order</v-btn>
    <div v-if="containerToPickInto != null">{{ containerToPickInto.ContainerId }}</div>

    <v-list v-if="orderToPickFrom && !unacknowledgedOrderDialog">
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="orderIdTitle(orderToPickFrom.orderDetail.orderId)"></v-list-item>
        </template>
        <v-list-item v-for="item in orderToPickFrom.items" :key="item.itemId" :title="item.name" @click="getContainerDetailById(item)">
          <template v-slot:append v-if="item.eventType == 423">
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
        <Scanner @codeScanned="(emittedData) => containerToPickInto = emittedData" />
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
        <v-btn @click="pickItem()">Pick</v-btn>
      </v-card>
    </v-dialog>
    <v-btn :disabled="!areAllItemsPicked" @click="completePicking()">All Items Picked, Move Order To Packaging</v-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { mdiCheckCircleOutline  } from '@mdi/js'
import { GetNextOrderByStatus, GetContainerDetailById, UpdateOrderDetail, GetContainerById, PickItem } from '@/functions/functions'
import SvgIcon from '@jamescoyle/vue-icon'
import Scanner from '@/components/scanning/Scanner.vue'

var genericId = ref(0)
var activeItem = ref(null)
var containerToPickInto = ref(null)
var containerDetailData = ref(null)
var orderToPickFrom = ref(null)
var unacknowledgedOrderDialog = ref(false)
var selectContainerToPickIntoDialog = ref(false)

const areAllItemsPicked = computed(() => {
  if(orderToPickFrom.value) {
    var allItemsPicked = true
    orderToPickFrom.value.items.forEach(item => {
      if(item.eventType != 423) {
        allItemsPicked = false
      }
    })
    return allItemsPicked
  } else {
    return false
  }
})

function getNextOrderByStatus() {
  GetNextOrderByStatus(410)
  .then(response => {
    orderToPickFrom.value = response.data
    unacknowledgedOrderDialog.value = true
  })
}
function getContainerDetailById(item) {
  activeItem.value = item
  GetContainerDetailById(item.containerId)
  .then(response => {
    containerDetailData.value = response.data
  })
}
function updateOrderDetail(orderDetailToUpdate) {
  UpdateOrderDetail(orderDetailToUpdate)
  .then(response => {
    setOrderAcknowledgementData(response.data)
  })
}
// function getContainerById() {
//   GetContainerById(containerToPickInto.value)
//   .then(containerResponse => {
//     orderToPickFrom.value.containerIdOrderItemsHeldIn = containerResponse.data.containerDetail.containerId
//     orderToPickFrom.value.orderDetail.orderStatus = 421
//     UpdateOrderDetail(orderToPickFrom.value.orderDetail)
//     .then(() => {
//       selectContainerToPickInto(containerResponse.data.containerDetail.containerId)
//     })
//   })
// }
function pickItem() {
  activeItem.value.containerId = containerToPickInto.value.ContainerId
  PickItem(activeItem.value)
  .then(response => {
    resetAllPickData(response.data)
  })
}
function acknowledgeOrder() {
  orderToPickFrom.value.orderDetail.orderStatus = 420
  updateOrderDetail(orderToPickFrom.value.orderDetail)
}
function completePicking() {
  orderToPickFrom.value.orderDetail.orderStatus = 510
  orderToPickFrom.value.orderDetail.containerIdOrderItemsHeldIn = containerToPickInto.value.ContainerId
  updateOrderDetail(orderToPickFrom.value.orderDetail)
}
function setOrderAcknowledgementData(responseData) {
  orderToPickFrom.value.orderDetail = responseData
  unacknowledgedOrderDialog.value = false
  selectContainerToPickIntoDialog.value = true
}
// function selectContainerToPickInto(containerId) {
//   containerToPickInto.value = containerId
//   selectContainerToPickIntoDialog.value = false
// }
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
