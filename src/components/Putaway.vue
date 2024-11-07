<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Item Id" v-model="itemToPutawayId"></v-text-field>
      </v-card>
      <v-btn @click="getItemById()">Find Item</v-btn>
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
          <v-btn @click="getPutawayLocationForItem()">Get Putaway Location</v-btn>
        </div>
        <div v-else>
          Putaway In Location: {{ putawayContainer.name }}
          <v-btn @click="putItemInContainer()">Putaway</v-btn>
        </div>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'

var itemToPutawayId = ''
var putawayContainer = null
var putawayItem = null

function getItemById() {
  axios.get('https://localhost:7187/WMS/GetItemById/' + itemToPutawayId)
  .then(response => putawayItem = response.data)
}
function getPutawayLocationForItem() {
  axios.get('https://localhost:7187/WMS/GetPutawayLocation')
  .then(response => putawayContainer = response.data)
}
function putItemInContainer() {
  putawayContainer.itemId = putawayItem.itemId
  axios.post('https://localhost:7187/WMS/PutawayItem', putawayContainer)
  .then(resetAllPutawayData())
}
function resetAllPutawayData() {
  itemToPutawayId = '',
  putawayContainer = null,
  putawayItem = null
}

</script>

<style scoped>
</style>