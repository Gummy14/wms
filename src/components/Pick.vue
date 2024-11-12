<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Pick By Search" v-model="genericId"></v-text-field>
      </v-card>
      <v-btn @click="getItemContainerRelationship(genericId)">Search</v-btn>
      
      <v-btn @click="getNextUnacknowledgedOrder()">Pick By Next Unacknowledged Order</v-btn>
      <div>
        <v-dialog
          v-model="unacknowledgedOrder"
          width="auto"
        >
          <v-card v-if="unacknowledgedOrder"
            max-width="400"
            :title="orderIdTitle(unacknowledgedOrder.order.orderId)"
            :subtitle="orderDateTimeSubtitle(unacknowledgedOrder.order.orderStatusDateTime)"
          >
            <v-list>
              <v-list-item v-for="item in unacknowledgedOrder.items" :key="item.itemId" :title="item.name"></v-list-item>
            </v-list>
            <v-btn @click="acknowledgeOrder()">Begin Picking</v-btn>
          </v-card>
        </v-dialog>
      </div>

      <v-list v-if="orderItemsToPickFrom">
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props" :title="orderIdTitle(orderItemsToPickFrom.order.orderId)"></v-list-item>
          </template>

          <v-list-item v-for="item in orderItemsToPickFrom.items" :key="item.itemId" :title="item.name" @click="getItemContainerRelationship(item.itemId)">
            <template v-slot:append v-if="item.eventType == 6">
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
var unacknowledgedOrder = ref(null)
var orderItemsToPickFrom = ref(null)

function getItemContainerRelationship(idToSearch) {
  axios.get('https://localhost:7187/WMS/GetItemContainerRelationship/' + idToSearch)
  .then(response => itemContainerData.value = response.data)
}
function pickItemFromContainer() {
  axios.post('https://localhost:7187/WMS/PickItem/', itemContainerData.value.container)
  .then(response => resetAllPickData(response.data))
}
function getNextUnacknowledgedOrder() {
  axios.get('https://localhost:7187/WMS/GetNextUnacknowledgedOrder/')
  .then(response => unacknowledgedOrder.value = response.data)
}
function acknowledgeOrder() {
  axios.post('https://localhost:7187/WMS/AcknowledgeOrder/', unacknowledgedOrder.value.order)
  .then(response => setOrderAcknowledgementData(response.data))
}
function setOrderAcknowledgementData(responseData) {
  unacknowledgedOrder.value = null
  orderItemsToPickFrom.value = responseData
}
function resetAllPickData(responseData) {
  genericId.value = 0,
  itemContainerData.value = null
  
  var itemIndexToUpdate = orderItemsToPickFrom.value.items.findIndex(x => x.itemId == responseData.itemId)
  orderItemsToPickFrom.value.items[itemIndexToUpdate] = responseData
}
function orderIdTitle(orderId) {
  return "Order Id: " + orderId
}
function orderDateTimeSubtitle(orderEventDateTime) {
  return "Order Received: " + orderEventDateTime
}
</script>

<style scoped>
</style>
