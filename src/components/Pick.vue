<template>
  <div>
    <v-btn @click="getOrderByStatus()">Pick By Next Unselected Order</v-btn>
    <div v-if="containerToPickInto != null">{{ containerToPickInto.id }}</div>

    <v-list v-if="orderToPickFrom">
      {{ orderToPickFrom.name }}
      <v-list-item 
        v-for="item in orderToPickFrom.orderItems" 
        :key="item.id"
        :title="item.name"
        :subtitle="item.locationId" 
        @click="pickItem(item)"
      >
        <!-- <template v-slot:append v-if="item.status == 423">
          <svg-icon type="mdi" :path="mdiCheckCircleOutline"></svg-icon>
        </template> -->
      </v-list-item>
    </v-list>

    <v-dialog
      v-model="unselectedOrderDialog"
      width="auto"
    >
      <v-card v-if="orderToPickFrom"
        max-width="400"
        :title="orderToPickFrom.name"
        :subtitle="orderToPickFrom.description"
      >
        <v-btn @click="selectOrder()">Select Order For Picking</v-btn>
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
      v-model="activeItem"
      width="auto"
    >
      <v-card v-if="activeItem" max-width="400">
        Pick {{ activeItem.name }} from {{ activeItem.locationId }} Into {{ containerToPickInto.id }}?
        <v-btn @click="confirmPick(activeItem, containerToPickInto)">Yes</v-btn>
      </v-card>
    </v-dialog>
    <v-btn :disabled="!areAllItemsPicked" @click="completePicking()">All Items Picked, Move Order To Packaging</v-btn>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { mdiCheckCircleOutline  } from '@mdi/js'
import { GetNextOrderByStatus, UpdateOrder, UpdateItem } from '@/functions/functions'
import SvgIcon from '@jamescoyle/vue-icon'
import Scanner from '@/components/scanning/Scanner.vue'

var activeItem = ref(null)
var containerToPickInto = ref(null)
var orderToPickFrom = ref(null)
var unselectedOrderDialog = ref(false)
var selectContainerToPickIntoDialog = ref(false)

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
  GetNextOrderByStatus(410)
  .then(response => {
    orderToPickFrom.value = response.data
    unselectedOrderDialog.value = true
  })
}
function selectOrder() {
  console.log(orderToPickFrom)
  orderToPickFrom.value.status = 420
  UpdateOrder(orderToPickFrom.value)
  .then(response => {
    orderToPickFrom.value = response.data
    unselectedOrderDialog.value = false
    selectContainerToPickIntoDialog.value = true
  })
}
function pickItem(item) {
  activeItem.value = item
}
function confirmPick(item, container) {
  item.status = 423
  item.locationId = '00000000-0000-0000-0000-000000000000'
  item.containerId = container.id
  UpdateItem(item)
  .then(response => {
    console.log('picked', response)
  })
}
// function completePicking() {
//   orderToPickFrom.value.warehouseParentObject.status = 510
//   orderToPickFrom.value.warehouseParentObject.parentId = containerToPickInto.value.id
//   updateOrderObject(orderToPickFrom.value.warehouseParentObject)
// }
// // function selectContainerToPickInto(containerId) {
// //   containerToPickInto.value = containerId
// //   selectContainerToPickIntoDialog.value = false
// // }
// function resetAllPickData(responseData) {
//   parentObject.value = null
  
//   var itemIndexToUpdate = orderToPickFrom.value.warehouseChildrenObjects.findIndex(x => x.id == responseData.id)
//   orderToPickFrom.value.warehouseChildrenObjects[itemIndexToUpdate] = responseData
// }
</script>

<style scoped>
</style>
