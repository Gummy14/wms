<template>
  <div>
    <v-content v-for="shipment in shipmentData">
      <!-- <v-row>
        <v-col cols="12">
          <v-btn 
            v-if="shipment.truckData.length == 0"
            @click="addTruck(shipment.id)"
          >
            Add Truck To Shipment
          </v-btn>
        </v-col>
      </v-row> -->
      <v-row>
        <v-col>Name:</v-col>
        <v-col>{{ shipment.name }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Description:</v-col>
        <v-col>{{ shipment.description }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Shipment ID:</v-col>
        <v-col>{{ shipment.shipmentId }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Timestamp Of Last Event Type Change:</v-col>
        <v-col>{{ shipment.dateTimeStamp }}</v-col>
      </v-row>
    </v-content>

    <!-- <v-dialog 
      v-model="openDialog"
      max-width="400"
    >
    <v-text-field label="Truck License Plate" v-model="licensePlate"></v-text-field>
    <v-btn @click="addTruckToShipment()">Add Truck To Shipment</v-btn>
  </v-dialog> -->
  </div>
</template>

<script setup>
const props = defineProps({
  shipmentData: Array
})
</script>

<style scoped>
</style>
          