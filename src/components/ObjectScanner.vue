<template>
  <div>
    <v-card>
      <Scanner @codeScanned="(emittedData) => scannedObject = emittedData" />
    </v-card>
    <v-card v-if="scannedObject"
      :text="scannedObject.objectData.description"
      :title="scannedObject.objectData.name"
    >
      <v-if v-if="actionSelected == 0">
        <v-btn 
          v-if="scannedObject.objectType == 0 && 
          scannedObject.objectData.locationId == null" 
          @click="selectForPutaway()"
        >
          Select For Putaway
        </v-btn>

        <v-btn 
          v-if="scannedObject.objectType == 0 && 
          scannedObject.objectData.locationId != null"
          @click="selectForPick()"
        >
          Select For Picking
        </v-btn>

        <v-btn
          v-if="scannedObject.objectType == 2" 
          @click="selectForPacking()"
        >
          Pack Items In Container
        </v-btn>

        <v-btn 
          v-if="scannedObject.objectType == 2" 
          @click="selectContainerToAddToOrder()"
        >
          Add Container To Order
        </v-btn>

        <v-btn 
          v-if="scannedObject.objectType == 0" 
          @click="getHistory(scannedObject.objectData.itemId, scannedObject.objectType)"
        >
          Get Item History
        </v-btn>

        <v-btn 
          v-if="scannedObject.objectType == 1" 
          @click="getHistory(scannedObject.objectData.locationId, scannedObject.objectType)"
        >
          Get Location History
        </v-btn>

        <v-btn 
          v-if="scannedObject.objectType == 2"
          @click="getHistory(scannedObject.objectData.containerId, scannedObject.objectType)"
        >
          Get Container History
        </v-btn>

        <v-btn 
          v-if="scannedObject.objectType == 4" 
          @click="getHistory(scannedObject.objectData.boxId, scannedObject.objectType)"
        >
          Get Container History
        </v-btn>
      </v-if>

      <v-else v-if="actionSelected == 1">
        Putaway In Location: {{ putawayLocation.name}}
        Scan Correct Location To Putaway Into:
        <Scanner @codeScanned="(emittedData) => scannedPutawayLocation = emittedData" />
        <div v-if="scannedPutawayLocation">
          Location Scanned
          <v-btn @click="putItemInLocation()">Confirm Putaway</v-btn>
        </div>
      </v-else>
      <v-else v-if="actionSelected == 2">
        Pick Item Into Container: {{ store.state.activeOrder.containerUsedToFulfillOrder.containerId }}
          <v-btn @click="pickItemIntoContainer()">Confirm Pick</v-btn>
      </v-else>
      <v-else v-if="actionSelected == 3">
        History:
        <div v-for="event in historyData">
          <div>
            {{ event.eventType }}
            {{ event.dateTimeStamp }}
          </div>
        </div>
      </v-else>
      <v-else v-if="actionSelected == 4">
        Scan Box To Package Items Into:
        <Scanner @codeScanned="(emittedData) => scannedBoxToPackInto = emittedData" />
        <div v-if="scannedBoxToPackInto">
          Box Scanned
          <v-btn @click="packItemsInContainer()">Confirm Pack</v-btn>
        </div>
      </v-else>
      <v-else v-if="actionSelected == 5">
        Scan Container To Add To Order: {{ orderId }}
        <v-btn @click="addContainerToOrder()">Confirm Pack</v-btn>
      </v-else>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  GetPutawayLocation,
  GetItemHistory,
  GetLocationHistory,
  GetContainerHistory,
  PutawayItem, 
  PickItem,
  PackItems,
  AddContainerToOrder
} from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'
import { useStore } from 'vuex'

const store = useStore()
const props = defineProps({
  orderId: Array
})

var actionSelected = ref(0)
var putawayLocation = ref(null)
var scannedObject = ref(null)
var scannedPutawayLocation = ref(null)
var scannedContainerToPickInto = ref(null)
var scannedBoxToPackInto = ref(null)
var historyData = ref(null)

function selectForPutaway() {
  GetPutawayLocation()
  .then(response => {
    putawayLocation.value = response.data
    actionSelected.value = 1
  })
}
function selectForPick() {
  actionSelected.value = 2
}
function selectForPacking() {
  actionSelected.value = 4
}
function selectContainerToAddToOrder() {
  actionSelected.value = 5
}
function getHistory(scannedObjectId, scannedObjectType) {
  switch(scannedObjectType) {
      case 0:
        GetItemHistory(scannedObjectId)
        .then(response => {
          actionSelected.value = 3
          historyData.value = response.data
        })
        break
      case 1:
        GetLocationHistory(scannedObjectId)
        .then(response => {
          actionSelected.value = 3
          historyData.value = response.data
        })
        break
      case 2:
        GetContainerHistory(scannedObjectId)
        .then(response => {
          actionSelected.value = 3
          historyData.value = response.data
        })
        break
      default:
        break
    }
}
function putItemInLocation() {
  PutawayItem(scannedObject.value.objectData.itemId, scannedPutawayLocation.value.objectData.locationId)
  .then(() => {
    resetAll()
  })
}
function pickItemIntoContainer() {
  PickItem(scannedObject.value.objectData.itemId, store.state.activeOrder.containerUsedToFulfillOrder.containerId)
  .then(() => {
    resetAll()
  })
}
function packItemsInContainer() {
  PackItems(scannedObject.value.objectData.containerId, scannedBoxToPackInto.value.objectData.boxId)
  .then(() => {
    resetAll()
  })
}
function addContainerToOrder() {
  AddContainerToOrder(props.orderId, scannedObject.value.objectData.containerId)
  .then(response => {
    resetAll()
    store.commit('updateActiveOrder', response.data)
  })
}
function resetAll() {
    actionSelected.value = 0
    putawayLocation.value = null
    scannedObject.value = null
    scannedPutawayLocation.value = null
    scannedContainerToPickInto.value = null
}
// function isInOrderItems(itemIdToFind) {
//   if(store.state.activeOrder.orderItems.find(x => x.itemId == itemIdToFind) != undefined) {
//     return true
//   } else {
//     return false
//   }
// }
</script>

<style scoped>
</style>