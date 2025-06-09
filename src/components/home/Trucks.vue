<template>
  <div>
    <div v-if="!retrievedAllTrucks">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-text-field label="Truck License Plate" v-model="truckLicensePlate"></v-text-field>
        <v-btn @click="registerTruck()">Add Truck</v-btn>
        <TruckList :trucks="allTrucks" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { GetAllTrucks, RegisterTruck } from '@/functions/functions'
import TruckList from '@/components/lists/TruckList.vue'

var retrievedAllTrucks = ref(false)
var allTrucks = ref(null)
var truckLicensePlate = ref(null)

function registerTruck() {
  RegisterTruck(truckLicensePlate.value)
  .then(() => {
    console.log('Registered')
  })
}

onMounted(() => {
  GetAllTrucks()
  .then(response => {
    allTrucks.value = response.data
    retrievedAllTrucks.value = true
  })
})
</script>

<style scoped>
</style>
      