<template>
  <div>
    <div>
      <Scanner must-verify @codeScanned="(emittedData) => putawayItem = emittedData" />
    </div>
    <div>
      <v-dialog
        v-model="putawayItem"
        width="auto"
      >
        <v-card v-if="putawayItem"
          max-width="400"
          :text="putawayItem.description"
          :title="putawayItem.name"
        >
        <div v-if="putawayLocation == null">
          <v-btn @click="selectForPutaway()">Select For Putaway</v-btn>
        </div>
        <div v-else>
          Putaway In Location: {{ putawayLocation.name }}
          <!-- <v-btn @click="setContainerFull()">Is Putaway Container Full? Request New Container</v-btn> -->
          <Scanner must-verify @codeScanned="(emittedData) => setScannedData(emittedData)" />
          <div v-if="scannedPutawayLocation">Location Scanned</div>
          <div v-if="scannedPutawayObject">Object Scanned</div>
          <v-btn v-if="scannedPutawayLocation && scannedPutawayObject" @click="putItemInContainer()">Confirm Putaway</v-btn>
        </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UpdateWarehouseObject, GetPutawayLocation } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var putawayLocation = ref(null)
var putawayItem = ref(null)
var scannedPutawayLocation = ref(null)
var scannedPutawayObject = ref(null)

function selectForPutaway() {
  if(putawayItem.value.objectType == 0) {
    putawayItem.value.eventType = 220
    UpdateWarehouseObject(putawayItem.value)
    .then(() => {
      getPutawayLocation()
    })
  }
}
function getPutawayLocation() {
  GetPutawayLocation()
  .then(response => {
    putawayLocation.value = response.data
  })
}
function setScannedData(scannedData) {
  console.log('YES')
  if (scannedData.objectType == 1 && scannedPutawayLocation.value == null) {
    console.log('HERE')
    scannedPutawayLocation.value = scannedData
  } else if (scannedData.objectType == 0 && scannedPutawayLocation.value != null && scannedPutawayObject.value == null) {
    console.log('HERE2')
    scannedPutawayObject.value = scannedData
  }
}
// function setContainerFull() {
//   putawayLocation.value.isFull = true
//   putawayLocation.value.eventType = 111
//   UpdateContainerDetail(putawayLocation.value)
//   .then(() => {
//     getPutawayLocation()
//   })
// }
function putItemInContainer() {
  putawayItem.value.parentId = putawayLocation.value.objectId
  putawayItem.value.eventType = 310
  UpdateWarehouseObject(putawayItem.value)
  .then(() => {
    putawayItem.value = '',
    putawayLocation.value = null,
    putawayItem.value = null
  })
}

</script>

<style scoped>
</style>