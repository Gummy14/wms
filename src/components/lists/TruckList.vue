<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="truck in trucks">
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="8">
              {{ truck.licensePlate }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>License Plate:</v-col>
            <v-col>{{ truck.licensePlate }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Truck ID:</v-col>
            <v-col>{{ truck.id }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Timestamp Of Arrival:</v-col>
            <v-col>{{ truck.arrivalDateTimeStamp }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row v-if="truck.departureDateTimeStamp != null">
            <v-col>Timestamp Of Departure:</v-col>
            <v-col>{{ truck.departureDateTimeStamp }}</v-col>
          </v-row>
          <v-row v-else>
            <v-col cols="12">
              <v-btn @click="openAddShipmentDialog(truck.id)">
                Add Shipments To Truck
              </v-btn>
              <v-btn @click="truckDeparture(truck.id)">
                Truck Has Departed
              </v-btn>
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-dialog v-model="allShipments">
      <v-card>
        <v-select
          v-model="selectedShipment"
          :items="allShipments"
          item-title="shipmentData[0].name"
          item-value="id"
          attach
          chips
        >
        </v-select>
        <v-btn @click="addShipmentToTruck()">Add Shipments To Truck</v-btn>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  SetTruckDepartedAsync, 
  GetAllShipmentsMostRecentData,
  AddShipmentToTruck
} from '@/functions/functions'

var allShipments = ref(false)
var selectedShipment = ref(null)
var activeTruckId = ref(null)

const props = defineProps({
  trucks: Array
})

function openAddShipmentDialog(truck) {
  GetAllShipmentsMostRecentData()
  .then(response => {
    allShipments.value = response.data
    activeTruckId.value = truck
  })
}
function addShipmentToTruck() {
  AddShipmentToTruck(selectedShipment.value, activeTruckId.value)
  .then(() => {
    console.log('Shipment Added')
    activeTruck.value = null
  })
}
function truckDeparture(truckId) {
  SetTruckDepartedAsync(truckId)
  .then(() => {
    console.log('Success')
  })
}
</script>

<style scoped>
</style>
        