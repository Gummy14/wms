<template>
  <div>
    <v-list v-for="shipment in shipments">
      <v-list-item 
        :title="shipment.shipmentDataHistory.find(x => x.nextEventId == null).name"
        :subtitle="shipment.id"
      >
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="shipment.shipmentDataHistory.find(x => x.nextEventId == null).dateTimeStamp"
            >
            </v-list-item>
          </template>
            
          <v-list-item
            v-for="shipmentDataHistoryEvent in shipment.shipmentDataHistory"
            :key="shipmentDataHistoryEvent.eventId"
            :title="shipmentDataHistoryEvent.dateTimeStamp"
          >
          </v-list-item>

        </v-list-group>
      </v-list-item>
    </v-list>
    <v-dialog 
      v-model="openDialog"
      max-width="400"
    >
    <v-text-field label="Truck License Plate" v-model="licensePlate"></v-text-field>
    <v-btn @click="addTruckToShipment()">Add Truck To Shipment</v-btn>
  </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { AddTruckToShipment } from '@/functions/functions'
import { useStore } from 'vuex'

const store = useStore()
var openDialog = ref(false)
var licensePlate = ref(null)
var shipmentIdToAddTruckTo = ref(false)
const props = defineProps({
  shipments: Array
})
function addTruck(shipmentId) {
  shipmentIdToAddTruckTo.value = shipmentId
  openDialog.value = true
}
function addTruckToShipment() {
  AddTruckToShipment(shipmentIdToAddTruckTo.value, licensePlate.value)
  .then(response => {
    store.commit('updateActiveShipment', response.data)
  })
}
</script>

<style scoped>
</style>
        