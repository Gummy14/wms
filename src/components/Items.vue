<template>
  <div>
    <div v-if="!retrievedAllItems">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-text-field label="Item Name" v-model="itemToRegister.name"></v-text-field>
        <v-text-field label="Item Description" v-model="itemToRegister.description"></v-text-field>
      </v-card>
      <v-btn @click="printQrCode()">Print Item QR Code</v-btn>

      <Scanner @codeScanned="(emittedData) => scannedQrCode = emittedData" />

      <v-card>
        <v-list>
          <v-list-item v-for="item in allItems" :key="item.itemId" :title="item.name"></v-list-item>
        </v-list>
      </v-card>

      <v-dialog
        v-model="scannedQrCode"
        width="auto"
      >
        <v-card v-if="scannedQrCode"
          max-width="400"
          :text="scannedQrCode.Description"
          :title="scannedQrCode.Name"
        >
          <v-btn @click="registerItem()">Register Item</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllWarehouseObjectsByType, RegisterObject, PrintQRCode } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var allItems = ref(null)
var retrievedAllItems = ref(false)
var scannedQrCode = ref(null)
var itemToRegister = ref({
  objectId: null,
  objectType: 0,
  name: '',
  description: ''
})

function printQrCode() {
  PrintQRCode(itemToRegister.value)
  .then(() => {
    console.log('saved')
  })
}
function registerItem() {
  RegisterObject(scannedQrCode.value)
  .then(() => {
    scannedQrCode.value = null
  })
}

onMounted(() => {
  GetAllWarehouseObjectsByType(0)
  .then(response => {
    allItems.value = response.data
    retrievedAllItems.value = true
  })
})
</script>

<style scoped>
</style>
