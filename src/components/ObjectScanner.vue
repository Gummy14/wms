<template>
  <div>
    <div>
      <Scanner must-verify @codeScanned="(emittedData) => scannedObject = emittedData" />
    </div>
    <div>
      <v-dialog
        v-model="scannedObject"
        width="auto"
      >
        <v-card v-if="scannedObject"
          max-width="400"
          :text="scannedObject.description"
          :title="scannedObject.name"
        >

        <v-if v-if="actionSelected == 0">
          <v-btn @click="selectForPutaway()">Select For Putaway</v-btn>
          <v-btn @click="selectForPick()">Select For Picking</v-btn>
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

        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
    UpdateItemSelectForPutaway, 
    UpdateItemSelectForPick, 
    UpdateItemPutInLocation, 
    GetPutawayLocation,
    UpdateItemPick
} from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var actionSelected = ref(0)
var putawayLocation = ref(null)
var scannedObject = ref(null)
var scannedPutawayLocation = ref(null)
var scannedContainerToPickInto = ref(null)

function selectForPutaway() {
  UpdateItemSelectForPutaway(scannedObject.value.id)
  .then(() => {
    GetPutawayLocation()
    .then(response => {
      putawayLocation.value = response.data
      actionSelected.value = 1
    })
  })
}
function selectForPick() {
  UpdateItemSelectForPick(scannedObject.value.id)
  .then(() => {
    actionSelected.value = 2
  })
}
function putItemInLocation() {
  UpdateItemPutInLocation(scannedObject.value.id, putawayLocation.value.id)
  .then(() => {
    resetAll()
  })
}
function pickItemIntoContainer() {
  UpdateItemPick(scannedObject.value.id, scannedContainerToPickInto.value.id)
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