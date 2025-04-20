<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="shipment in shipments">
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="8">
              {{ shipment.shipmentDataHistory.filter(x => x.nextEventId == null)[0].name }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12">
              <v-btn 
                v-if="shipment.truckData.length == 0"
                @click="addTruck(shipment.id)"
              >
                Add Truck To Shipment
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>Description:</v-col>
            <v-col>{{ shipment.shipmentDataHistory.filter(x => x.nextEventId == null)[0].description }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Shipment ID:</v-col>
            <v-col>{{ shipment.Id }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Timestamp Of Last Event Type Change:</v-col>
            <v-col>{{ shipment.shipmentDataHistory.filter(x => x.nextEventId == null)[0].dateTimeStamp }}</v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
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
        