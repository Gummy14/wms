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
          <v-btn @click="selectForPutaway()">Select For Putaway</v-btn>
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
import { ref } from 'vue'
import { GetItemById, UpdateItem, GetPutawayLocation } from '@/functions/functions'

var itemToPutawayId = ref('')
var putawayContainer = ref(null)
var putawayItem = ref(null)

function getItemById() {
  GetItemById(itemToPutawayId.value)
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
function putItemInContainer() {
  putawayItem.value.containerId = putawayContainer.value.containerId
  putawayItem.value.eventType = 310
  UpdateItem(putawayItem.value)
  .then(() => {
    resetAllPutawayData()
  })
}
function resetAllPutawayData() {
  itemToPutawayId.value = '',
  putawayContainer.value = null,
  putawayItem.value = null
}

</script>

<style scoped>
</style>