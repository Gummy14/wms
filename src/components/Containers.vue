<template>
  <div>
    <div v-if="!retrievedAllContainers">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-text-field label="Container Name" v-model="containerToRegister.objectData.name"></v-text-field>
        <v-select :items="containerTypes" item-title="type" item-value="id" label="Container Type" v-model="containerToRegister.objectData.containerType"></v-select>
        <v-btn @click="printContainerQrCode()">Print Container QR Code</v-btn>
      </v-card>

      <Scanner @codeScanned="(emittedData) => scannedQrCode = emittedData" />

      <v-card>
        <v-list>
          <v-list-item v-for="container in allContainers" :key="container.containerDetail.containerId" :title="container.containerDetail.name"></v-list-item>
        </v-list>
      </v-card>

      <v-dialog
        v-model="scannedQrCode"
        width="auto"
      >
        <v-card v-if="scannedQrCode"
          max-width="400"
          :title="scannedQrCode.ObjectData.Name"
        >
          <v-btn @click="registerContainer()">Register Container</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllContainers, PrintQRCode, RegisterContainer } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var containerTypes = ref([{id: 0, type: 'Putaway'}, {id: 1, type: 'Picking'}])
var retrievedAllContainers = ref(false)
var allContainers = ref(null)
var scannedQrCode = ref(null)
var containerToRegister = ref({
  objectId: null,
  objectType: 2,
  objectData: {
    name: '',
    description: '',
    containerType: 0
  }
})

function printContainerQrCode() {
  PrintQRCode(containerToRegister.value)
  .then(() => {
    console.log('saved')
  })
}
function registerContainer() {
  RegisterContainer(scannedQrCode.value)
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
