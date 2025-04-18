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
          scannedObject.objectData.locationId != null &&
          scannedObject.objectData.orderId != null"
          @click="selectForPick()"
        >
          Select For Picking
        </v-btn>

        <v-btn 
          v-if="scannedObject.objectType == 0 && 
          scannedObject.objectData.containerId != null"
          @click="selectForPack()"
        >
          Select For Packing
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

        <!-- <v-btn 
          v-if="scannedObject.objectType == 4" 
          @click="confirmBoxSealed()"
        >
          Confirm Box Sealed
        </v-btn> -->

        <v-btn 
          v-if="scannedObject.objectType == 4" 
          @click="getShippingLabel()"
        >
          Create Shipping Label
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
          Get Box History
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
        Pick Item Into Container: {{ store.state.activeOrder.containerUsedToPickOrder.filter(x => x.nextEventId == null)[0].containerId }}
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
        Scan Box To Pack Items In:
        <Scanner @codeScanned="(emittedData) => scannedBoxToPackInto = emittedData" />
        <div v-if="scannedBoxToPackInto">
          Box Scanned
          <v-btn @click="addBoxToOrder()">Confirm Pack Items With Box</v-btn>
        </div>
      </v-else>
      <v-else v-if="actionSelected == 5">
        Scan Container To Add To Order: {{ orderId }}
        <v-btn @click="addContainerToOrder()">Confirm Pick Items With Container</v-btn>
      </v-else>
      <v-else v-if="actionSelected == 6">
        Pack Item Into Box: {{ store.state.activeOrder.boxUsedToPackOrder.filter(x => x.nextEventId == null)[0].boxId }}
        <v-btn @click="packItemIntoBox()">Confirm Pack</v-btn>
      </v-else>
      <v-else v-if="actionSelected == 8">
        {{ scannedObject.objectData.boxId }}
        <v-btn @click="printShippingLabel()">Print Shipping Label</v-btn>
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
  PackItem,
  AddBoxToOrder,
  AddContainerToOrder,
  PrintShippingLabel
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
function selectForPack() {
  actionSelected.value = 6
}
function selectForPacking() {
  actionSelected.value = 4
}
function selectContainerToAddToOrder() {
  actionSelected.value = 5
}
function confirmBoxSealed() {
  actionSelected.value = 7
}
function getShippingLabel() {
  actionSelected.value = 8
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
  PickItem(scannedObject.value.objectData.itemId, store.state.activeOrder.containerUsedToPickOrder.filter(x => x.nextEventId == null)[0].containerId)
  .then(response => {
    resetAll()
    store.commit('updateActiveOrder', response.data)
  })
}
function packItemIntoBox() {
  PackItem(scannedObject.value.objectData.itemId, store.state.activeOrder.boxUsedToPackOrder.filter(x => x.nextEventId == null)[0].boxId)
  .then(response => {
    resetAll()
    store.commit('updateActiveOrder', response.data)
  })
}
function addBoxToOrder() {
  AddBoxToOrder(scannedObject.value.objectData.orderId, scannedBoxToPackInto.value.objectData.boxId)
  .then(response => {
    resetAll()
    store.commit('updateActiveOrder', response.data)
  })
}
function addContainerToOrder() {
  AddContainerToOrder(props.orderId, scannedObject.value.objectData.containerId)
  .then(response => {
    resetAll()
    store.commit('updateActiveOrder', response.data)
  })
}
function printShippingLabel() {
  PrintShippingLabel(scannedObject.value.objectData.boxId)
  .then(() => {
    console.log('Label Printed')
  })
}
function resetAll() {
    actionSelected.value = 0
    putawayLocation.value = null
    scannedObject.value = null
    scannedPutawayLocation.value = null
    scannedContainerToPickInto.value = null
}
</script>

<style scoped>
</style>