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
          <Scanner must-verify @codeScanned="(emittedData) => setScannedData(emittedData)" />
          <div v-if="scannedPutawayLocation">Location Scanned</div>
          <div v-if="scannedPutawayObject">Object Scanned</div>
          <v-btn v-if="scannedPutawayLocation && scannedPutawayObject" @click="putItemInLocation()">Confirm Putaway</v-btn>
        </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { UpdateWarehouseObject, GetPutawayLocation, CreateWarehouseObjectRelationship } from '@/functions/functions'
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
  if (scannedData.objectType == 1 && scannedPutawayLocation.value == null) {
    scannedPutawayLocation.value = scannedData
  } else if (scannedData.objectType == 0 && scannedPutawayLocation.value != null && scannedPutawayObject.value == null) {
    scannedPutawayObject.value = scannedData
  }
}
function putItemInLocation() {
  putawayItem.value.eventType = 310
  putawayLocation.value.eventType = 310
  var objectRelationship = {
    parent: putawayLocation.value,
    child: putawayItem.value
  }
  CreateWarehouseObjectRelationship(objectRelationship)
  .then(() => {
    putawayItem.value = '',
    putawayLocation.value = null,
    putawayItem.value = null
  })
}

</script>

<style scoped>
</style>