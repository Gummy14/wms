<template>
  <div>
    <v-card>
      <Scanner must-verify @codeScanned="(emittedData) => scannedObject = emittedData" />
    </v-card>
    <v-card v-if="scannedObject"
      :text="scannedObject.objectData.description"
      :title="scannedObject.objectData.name"
    >
      <v-if v-if="actionSelected == 0">
        <v-btn @click="selectForPutaway()">Select For Putaway</v-btn>
        <v-btn @click="selectForPick()">Select For Picking</v-btn>
        <v-btn @click="selectForPacking()">Pack Items In Container</v-btn>
        <v-btn @click="getHistory(scannedObject.objectData.id, scannedObject.objectType)">Get Object History</v-btn>
      </v-if>
      <v-else v-if="actionSelected == 1">
        Putaway In Location: {{ putawayLocation.name }}
        Scan Correct Location To Putaway Into:
        <Scanner must-verify @codeScanned="(emittedData) => scannedPutawayLocation = emittedData" />
        <div v-if="scannedPutawayLocation">
          Location Scanned
          <v-btn @click="putItemInLocation()">Confirm Putaway</v-btn>
        </div>
      </v-else>
      <v-else v-if="actionSelected == 2">
        Scan Container To Pick Into:
        <Scanner must-verify @codeScanned="(emittedData) => scannedContainerToPickInto = emittedData" />
        <div v-if="scannedContainerToPickInto">
          Container Scanned
          <v-btn @click="pickItemIntoContainer()">Confirm Pick</v-btn>
        </div>
      </v-else>
      <v-else v-if="actionSelected == 3">
        History:
        <div v-for="event in historyData">
          <div>
            {{ event.status }}
            {{ event.dateTimeStamp }}
          </div>
        </div>
      </v-else>
      <v-else v-if="actionSelected == 4">
        Scan Box To Package Items Into:
        <Scanner must-verify @codeScanned="(emittedData) => scannedBoxToPackInto = emittedData" />
        <div v-if="scannedBoxToPackInto">
          Box Scanned
          <v-btn @click="packItemsInContainer()">Confirm Pack</v-btn>
        </div>
      </v-else>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
    PutawayItem, 
    GetPutawayLocation,
    PickItem,
    GetItemHistory,
    GetLocationHistory,
    GetContainerHistory,
    PackItems
} from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

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
  PutawayItem(scannedObject.value.objectData.id, scannedPutawayLocation.value.objectData.id)
  .then(() => {
    resetAll()
  })
}
function pickItemIntoContainer() {
  PickItem(scannedObject.value.objectData.id, scannedContainerToPickInto.value.objectData.id)
  .then(() => {
    resetAll()
  })
}
function packItemsInContainer() {
  PackItems(scannedObject.value.objectData.id, scannedBoxToPackInto.value.objectData.id)
  .then(() => {
    resetAll()
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