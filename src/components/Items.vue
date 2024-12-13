<template>
  <div>
    <div v-if="!retrievedAllItems">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <v-text-field label="Item Name" v-model="itemToRegister.objectData.name"></v-text-field>
        <v-text-field label="Item Description" v-model="itemToRegister.objectData.description"></v-text-field>
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
          :text="scannedQrCode.ObjectData.Description"
          :title="scannedQrCode.ObjectData.Name"
        >
          <v-btn @click="registerItem()">Register Item</v-btn>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllItems, RegisterItem, PrintQRCode } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var allItems = ref(null)
var retrievedAllItems = ref(false)
var scannedQrCode = ref(null)
var itemToRegister = ref({
  objectId: null,
  objectType: 1,
  objectData: {
    name: '',
    description: '',
    containerType: 0
  }
})

function printQrCode() {
  PrintQRCode(itemToRegister.value)
  .then(() => {
    console.log('saved')
  })
}
function registerItem() {
  RegisterItem(scannedQrCode.value)
  .then(() => {
    scannedQrCode.value = null
  })
}

onMounted(() => {
  GetAllItems()
  .then(response => {
    allItems.value = response.data
    retrievedAllItems.value = true
  })
})
</script>

<style scoped>
</style>
