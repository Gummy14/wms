<template>
  <div>
    <v-btn @click="getOrderByStatus()">Pick By Next Unacknowledged Order</v-btn>
    <div v-if="containerToPickInto != null">{{ containerToPickInto.objectId }}</div>

    <v-list v-if="dictionary">
      <v-list-group v-for="(order, index) in dictionary" :key="index">
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="index"></v-list-item>
        </template>
        <v-list-item v-for="item in dictionary[index]" :key="item" :title="item"></v-list-item>
      </v-list-group>
      <!-- <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" :title="orderIdTitle(orderToPickFrom.warehouseParentObject.objectId)"></v-list-item>
        </template>
        <v-list-item v-for="item in orderToPickFrom.warehouseChildrenObjects" :key="item.objectId" :title="item.name" @click="getContainerDetailById(item)">
          <template v-slot:append v-if="item.status == 423">
            <svg-icon type="mdi" :path="mdiCheckCircleOutline"></svg-icon>
          </template>
        </v-list-item>
      </v-list-group> -->
    </v-list>

    <v-dialog
      v-model="unacknowledgedOrderDialog"
      width="auto"
    >
      <v-card v-if="orderToPickFrom"
        max-width="400"
        :title="orderToPickFrom.name"
        :subtitle="orderToPickFrom.description"
      >
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
import { GetAllWarehouseRelationshipsByChildId, GetWarehouseObjectByStatus, UpdateWarehouseObject, GetAllWarehouseRelationshipsByParentId } from '@/functions/functions'
import SvgIcon from '@jamescoyle/vue-icon'
import Scanner from '@/components/scanning/Scanner.vue'

var genericId = ref(0)
var activeItem = ref(null)
var containerToPickInto = ref(null)
var parentObject = ref(null)
var orderToPickFrom = ref(null)
var unacknowledgedOrderDialog = ref(false)
var selectContainerToPickIntoDialog = ref(false)
var dictionary = ref({})

// const areAllItemsPicked = computed(() => {
//   if(orderToPickFrom.value) {
//     var allItemsPicked = true
//     orderToPickFrom.value.warehouseChildrenObjects.forEach(item => {
//       if(item.status != 423) {
//         allItemsPicked = false
//       }
//     })
//     return allItemsPicked
//   } else {
//     return false
//   }
// })

function getOrderByStatus() {
  GetWarehouseObjectByStatus(410)
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
function updateOrderObject(objectToUpdate) {
  UpdateWarehouseObject(objectToUpdate)
  .then(response => {
    GetAllWarehouseRelationshipsByParentId(response.data.objectId)
    .then(warehouseRelationshipData => {
      warehouseRelationshipData.data.forEach(warehouseRelationship => {
        if (dictionary.value[warehouseRelationship.parentId]) {
          dictionary.value[warehouseRelationship.parentId].push(warehouseRelationship.childId)
        } else {
          dictionary.value[warehouseRelationship.parentId] = [warehouseRelationship.childId]
        }
      });
      orderToPickFrom.value = response.data
      unacknowledgedOrderDialog.value = false
      selectContainerToPickIntoDialog.value = true
    })
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
  orderToPickFrom.value.status = 420
  updateOrderObject(orderToPickFrom.value)
}
function completePicking() {
  orderToPickFrom.value.warehouseParentObject.status = 510
  orderToPickFrom.value.warehouseParentObject.parentId = containerToPickInto.value.objectId
  updateOrderObject(orderToPickFrom.value.warehouseParentObject)
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
</script>

<style scoped>
</style>
