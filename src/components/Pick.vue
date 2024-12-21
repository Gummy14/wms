<template>
  <div>
    <v-btn @click="getOrderByStatus()">Pick By Next Unacknowledged Order</v-btn>
    <div v-if="containerToPickInto != null">{{ containerToPickInto.objectId }}</div>

    <v-list v-if="orderToPickFrom && !unacknowledgedOrderDialog">
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="orderIdTitle(orderToPickFrom.warehouseParentObject.objectId)"></v-list-item>
        </template>
        <v-list-item v-for="item in orderToPickFrom.warehouseChildrenObjects" :key="item.objectId" :title="item.name" @click="getContainerDetailById(item)">
          <template v-slot:append v-if="item.status == 423">
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
        :title="orderIdTitle(orderToPickFrom.warehouseParentObject.objectId)"
        :subtitle="orderDateTimeSubtitle(orderToPickFrom.warehouseParentObject.eventDateTime)"
      >
        <v-list>
          <v-list-item v-for="item in orderToPickFrom.warehouseChildrenObjects" :key="item.objectId" :title="item.name"></v-list-item>
        </v-list>
        <v-btn @click="acknowledgeOrder()">Select Order For Picking</v-btn>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="selectContainerToPickIntoDialog"
      width="auto"
    >
      <v-card>
        <Scanner must-verify @codeScanned="(emittedData) => containerToPickInto = emittedData" />
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="parentObject"
      width="auto"
    >
      <v-card v-if="parentObject"
        max-width="400"
        :title="parentObject.name"
        :subtitle="parentObject.objectId"
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
import { GetAllWarehouseRelationshipsByChildId, GetAllWarehouseRelationshipsByParentStatus, UpdateWarehouseObject, PickItem } from '@/functions/functions'
import SvgIcon from '@jamescoyle/vue-icon'
import Scanner from '@/components/scanning/Scanner.vue'

var genericId = ref(0)
var activeItem = ref(null)
var containerToPickInto = ref(null)
var parentObject = ref(null)
var orderToPickFrom = ref(null)
var unacknowledgedOrderDialog = ref(false)
var selectContainerToPickIntoDialog = ref(false)

const areAllItemsPicked = computed(() => {
  if(orderToPickFrom.value) {
    var allItemsPicked = true
    orderToPickFrom.value.warehouseChildrenObjects.forEach(item => {
      if(item.status != 423) {
        allItemsPicked = false
      }
    })
    return allItemsPicked
  } else {
    return false
  }
})

function getOrderByStatus() {
  GetAllWarehouseRelationshipsByParentStatus(410)
  .then(response => {
    orderToPickFrom.value = response.data
    unacknowledgedOrderDialog.value = true
  })
}
function getContainerDetailById(item) {
  activeItem.value = item
  GetAllWarehouseRelationshipsByChildId(item.objectId)
  .then(response => {
    parentObject.value = response.data
  })
}
function updateOrderDetail(orderDetailToUpdate) {
  UpdateWarehouseObject(orderDetailToUpdate)
  .then(response => {
    setOrderAcknowledgementData(response.data)
  })
}
function pickItem() {
  activeItem.value.parentId = containerToPickInto.value.ObjectId
  UpdateWarehouseObjectRelationship(activeItem.value)
  .then(response => {
    resetAllPickData(response.data)
  })
}
function acknowledgeOrder() {
  orderToPickFrom.value.warehouseParentObject.status = 420
  updateOrderDetail(orderToPickFrom.value.warehouseParentObject)
}
function completePicking() {
  orderToPickFrom.value.warehouseParentObject.status = 510
  orderToPickFrom.value.warehouseParentObject.parentId = containerToPickInto.value.objectId
  updateOrderDetail(orderToPickFrom.value.warehouseParentObject)
}
function setOrderAcknowledgementData(responseData) {
  orderToPickFrom.value.warehouseParentObject = responseData
  unacknowledgedOrderDialog.value = false
  selectContainerToPickIntoDialog.value = true
}
// function selectContainerToPickInto(containerId) {
//   containerToPickInto.value = containerId
//   selectContainerToPickIntoDialog.value = false
// }
function resetAllPickData(responseData) {
  genericId.value = 0,
  parentObject.value = null
  
  var itemIndexToUpdate = orderToPickFrom.value.warehouseChildrenObjects.findIndex(x => x.objectId == responseData.objectId)
  orderToPickFrom.value.warehouseChildrenObjects[itemIndexToUpdate] = responseData
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
