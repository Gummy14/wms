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
          <v-btn @click="beginPutaway()">Begin Putaway</v-btn>
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
import { ref } from 'vue'

var itemToPutawayId = ref('')
var putawayContainer = ref(null)
var putawayItem = ref(null)

function getItemById() {
  axios.get('https://localhost:7187/Item/GetItemById/' + itemToPutawayId.value)
  .then(response => putawayItem.value = response.data)
}
function beginPutaway() {
  axios.post('https://localhost:7187/Putaway/BeginPutaway', putawayItem.value)
  .then(getPutawayLocationForItem())
}
function getPutawayLocationForItem() {
  axios.get('https://localhost:7187/Putaway/GetPutawayLocation')
  .then(response => putawayContainer.value = response.data)
}
function putItemInContainer() {
  putawayContainer.value.itemId = putawayItem.value.itemId
  axios.post('https://localhost:7187/Putaway/PutawayItem', putawayContainer.value)
  .then(resetAllPutawayData())
}
function resetAllPutawayData() {
  itemToPutawayId.value = '',
  putawayContainer.value = null,
  putawayItem.value = null
}

</script>

<style scoped>
</style>