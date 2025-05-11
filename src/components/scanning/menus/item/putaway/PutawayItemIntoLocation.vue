<template>
  <div>
    Putaway In Location: {{ locationToPutaway.name}}
    Scan Correct Location To Putaway Into:
    <Scanner @codeScanned="(emittedData) => scannedPutawayLocation = emittedData" />
    <div v-if="scannedPutawayLocation">
      Location Scanned
      <v-btn @click="putItemInLocation()">Confirm Putaway</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { PutawayItemIntoLocation } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var actionSelected = ref(0)
var scannedPutawayLocation = ref(null)

const props = defineProps({
  item: Object,
  locationToPutaway: Object
})

function putItemInLocation() {
  PutawayItemIntoLocation(props.item.id, scannedPutawayLocation.value.objectData.id)
  .then(() => {
    resetAll()
  })
}
function resetAll() {
  actionSelected.value = 0
  scannedPutawayLocation.value = null
}
</script>

<style scoped>
</style>