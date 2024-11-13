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

function getObjectHistory() {
  axios.get('https://localhost:7187/History/GetObjectHistory/' + genericId.value)
  .then(response => warehouseItemHistory.value = response.data)
}
function orderHistoryEntry(warehouseObject) {
  switch(warehouseObject.eventType) {
    case 1:
      return 'Item Registered'
    case 2:
      return 'Container Registered'
    case 3:
      return 'Item Putaway Into Container ID: ' + warehouseObject.containerId
    case 4:
      return 'Item Added To Order ID: ' + warehouseObject.orderId
    case 5:
      return 'Item Picked From Container ID: ' + warehouseObject.containerId
    case 6:
      return 'Item Picked From Container ID ' + warehouseObject.containerId
    default:
      return ''
  }
}
</script>

<style scoped>
</style>
  