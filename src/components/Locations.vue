<template>
  <div>
    <div v-if="!retrievedAllLocations">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-text-field label="Location Name" v-model="locationToRegister.name"></v-text-field>
        <v-btn @click="printQrCode()">Print Location QR Code</v-btn>
      </v-card>

      <Scanner @codeScanned="(emittedData) => scannedQrCode = emittedData" />

      <v-card>
        <v-list>
          <v-list-item v-for="location in allLocations" :key="location.id" :title="location.name"></v-list-item>
        </v-list>
      </v-card>

      <v-dialog
        v-model="scannedQrCode"
        width="auto"
      >
        <v-card v-if="scannedQrCode"
          max-width="400"
          :title="scannedQrCode.Name"
        >
          <v-btn @click="registerLocation()">Register Location</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllLocations, PrintQRCode, RegisterWarehouseObject } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var retrievedAllLocations = ref(false)
var allLocations = ref(null)
var scannedQrCode = ref(null)
var locationToRegister = ref({
  id: null,
  objectType: 1,
  name: '',
  description: '',
})

function printQrCode() {
  PrintQRCode(locationToRegister.value)
  .then(() => {
    console.log('saved')
  })
}
function registerLocation() {
  RegisterWarehouseObject(scannedQrCode.value)
  .then(() => {
    scannedQrCode.value = null
  })
}

onMounted(() => {
  GetAllLocations()
  .then(response => {
    allLocations.value = response.data
    retrievedAllLocations.value = true
  })
})
</script>

<style scoped>
</style>
