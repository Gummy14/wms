<template>
    <div>
      <div v-if="!retrievedAllContainers">
        <v-progress-circular indeterminate></v-progress-circular>
      </div>
      <div v-else>
        <v-card>
          <v-text-field label="Container Name" v-model="containerToRegister.name"></v-text-field>
          <v-btn @click="printQrCode()">Print Container QR Code</v-btn>
        </v-card>
  
        <Scanner @codeScanned="(emittedData) => scannedQrCode = emittedData" />
  
        <v-card>
          <v-list>
            <v-list-item v-for="container in allContainers" :key="container.id" :title="container.name"></v-list-item>
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
            <v-btn @click="registerContainer()">Register Container</v-btn>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { GetAllContainers, PrintQRCode, RegisterWarehouseObject } from '@/functions/functions'
  import Scanner from '@/components/scanning/Scanner.vue'
  
  var retrievedAllContainers = ref(false)
  var allContainers = ref(null)
  var scannedQrCode = ref(null)
  var containerToRegister = ref({
    id: null,
    objectType: 2,
    name: '',
    description: '',
  })
  
  function printQrCode() {
    PrintQRCode(containerToRegister.value)
    .then(() => {
      console.log('saved')
    })
  }
  function registerContainer() {
    RegisterWarehouseObject(scannedQrCode.value)
    .then(() => {
      scannedQrCode.value = null
    })
  }
  
  onMounted(() => {
    GetAllContainers()
    .then(response => {
      allContainers.value = response.data
      retrievedAllContainers.value = true
    })
  })
  </script>
  
  <style scoped>
  </style>
  