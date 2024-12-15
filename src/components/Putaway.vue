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
        <div v-if="putawayContainer == null">
          <v-btn @click="selectForPutaway()">Select For Putaway</v-btn>
        </div>
        <div v-else>
          Putaway In Location: {{ putawayContainer.name }}
          <v-btn @click="setContainerFull()">Is Putaway Container Full? Request New Container</v-btn>
          <Scanner must-verify @codeScanned="(emittedData) => scannedContainer = emittedData" />
          <div v-if="containerIdDoesNotMatch">Incorrect Container Scanned</div>
          <v-btn v-if="scannedContainer != null" @click="putItemInContainer()">Matching Container Successfully Scanned. Confirm Putaway</v-btn>
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

var putawayContainer = ref(null)
var scannedContainer = ref(null)
var putawayItem = ref(null)
var containerIdDoesNotMatch = ref(null)

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
    putawayContainer.value = response.data
  })
}
// function setContainerFull() {
//   putawayContainer.value.isFull = true
//   putawayContainer.value.eventType = 111
//   UpdateContainerDetail(putawayContainer.value)
//   .then(() => {
//     getPutawayLocation()
//   })
// }
function putItemInContainer() {
  putawayItem.value.parentId = putawayContainer.value.objectId
  putawayItem.value.eventType = 310
  UpdateWarehouseObject(putawayItem.value)
  .then(() => {
    putawayItem.value = '',
    putawayContainer.value = null,
    putawayItem.value = null
  })
}

</script>

<style scoped>
</style>