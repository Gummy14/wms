<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Pick By Search" v-model="genericId"></v-text-field>
      </v-card>
      <v-btn @click="getItemContainerRelationship(genericId)">Search</v-btn>
      
      <v-list>
        <v-list-group v-for="order in allOrders" :key="order.orderId">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(order.orderId)"></v-list-item>
          </template>
          <v-list-item v-for="item in order.items" :key="item.itemId" :title="item.name" @click="getItemContainerRelationship(item.itemId)">
            <template v-slot:append v-if="item.eventType == 5">
              <svg-icon type="mdi" :path="mdiCheckCircleOutline"></svg-icon>
            </template>
          </v-list-item>
        </v-list-group>
      </v-list>
    </div>
    <div>
      <v-dialog
        v-model="itemContainerData"
        width="auto"
      >
        <v-card v-if="itemContainerData"
          max-width="400"
          :text="itemContainerData.item.description"
          :title="itemContainerData.item.name"
        >
          Container Id: {{ itemContainerData.container.containerId }}
          Container Name: {{ itemContainerData.container.name }}
          <v-btn @click="pickItemFromContainer()">Pick</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiCheckCircleOutline  } from '@mdi/js'

var genericId = ref(0)
var itemContainerData = ref(null)
var allOrders = ref(null)

function getItemContainerRelationship(idToSearch) {
  axios.get('https://localhost:7187/WMS/GetItemContainerRelationship/' + idToSearch)
  .then(response => itemContainerData.value = response.data)
}
function pickItemFromContainer() {
  axios.post('https://localhost:7187/WMS/PickItem/', itemContainerData.value.container)
  .then(resetAllPutawayData())
}
function getAllOrders() {
  axios.get('https://localhost:7187/WMS/GetAllOrders/')
  .then(response => allOrders.value = response.data)
}
function resetAllPutawayData() {
  genericId.value = 0,
  itemContainerData.value = null
  getAllOrders()
}
function orderIdTitle(orderId) {
  return "Order Id: " + orderId
}

onMounted(() => {
  getAllOrders()
})
</script>

<style scoped>
</style>
