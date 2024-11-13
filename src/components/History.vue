<template>
  <div>
    <v-card>
      <v-text-field label="Get History By Id" v-model="genericId"></v-text-field>
    </v-card>
    <v-btn @click="getObjectHistory()">Get History By Id</v-btn>

    <v-list>
      <v-list-item 
      v-for="warehouseObject in warehouseItemHistory" 
      :key="warehouseObject.itemEventId" 
      :subtitle="warehouseObject.eventDateTime" 
      :title="orderHistoryEntry(warehouseObject)">
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'

var genericId = ref('')
var warehouseItemHistory = ref()
var eventTypes = ref(null)

function getObjectHistory() {
  axios.get('https://localhost:7187/History/GetObjectHistory/' + genericId.value)
  .then(response => warehouseItemHistory.value = response.data)
}
function orderHistoryEntry(warehouseObject) {
  if(eventTypes != null) {
    return eventTypes.value.find(x => x.id === warehouseObject.eventType).eventTypeDescription
  }
}
function getAllEventTypes() {
  axios.get('https://localhost:7187/EventTypes/GetAllEventTypes/')
  .then(response => eventTypes.value = response.data)
}

onMounted(() => {
  getAllEventTypes()
})
</script>

<style scoped>
</style>
  