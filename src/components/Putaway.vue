<template>
  <div>
    <div>
      <QrcodeStream @detect="onDetect" />
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
          <v-btn @click="putItemInContainer()">Putaway</v-btn>
        </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GetItemById, UpdateItem, GetPutawayLocation, UpdateContainerDetail } from '@/functions/functions'
import { QrcodeStream } from 'vue-qrcode-reader'

var putawayContainer = ref(null)
var putawayItem = ref(null)

function getItemById() {
  GetItemById(putawayItem.value)
  .then(response => {
    putawayItem.value = response.data
  })
}
function selectForPutaway() {
  putawayItem.value.eventType = 220
  UpdateItem(putawayItem.value)
  .then(() => {
    getPutawayLocation()
  })
}
function getPutawayLocation() {
  GetPutawayLocation()
  .then(response => {
    putawayContainer.value = response.data
  })
}
function setContainerFull() {
  putawayContainer.value.isFull = true
  putawayContainer.value.eventType = 111
  UpdateContainerDetail(putawayContainer.value)
  .then(() => {
    getPutawayLocation()
  })
}
function putItemInContainer() {
  putawayItem.value.containerId = putawayContainer.value.containerId
  putawayItem.value.eventType = 310
  UpdateItem(putawayItem.value)
  .then(() => {
    putawayItem.value = '',
    putawayContainer.value = null,
    putawayItem.value = null
  })
}
function onDetect(detectedCodes) {
  putawayItem.value = JSON.parse(detectedCodes[0].rawValue)
  GetItemById(putawayItem.value.ItemId)
  .then(response => {
    putawayItem.value = response.data
  })
}

</script>

<style scoped>
</style>