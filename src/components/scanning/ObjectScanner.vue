<template>
  <div>
    <Scanner @codeScanned="(emittedData) => scannedObject = emittedData" />
    <div v-if="scannedObject">
      <ItemScanMenu 
        v-if="scannedObject.objectType == 0" 
        :item="scannedObject.objectData" 
      />

      <LocationScanMenu
        v-else-if="scannedObject.objectType == 1"
        :location="scannedObject.objectData" 
      />

      <BoxScanMenu 
        v-else-if="scannedObject.objectType == 4"
        :box="scannedObject.objectData"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Scanner from '@/components/scanning/Scanner.vue'
import ItemScanMenu from '@/components/scanning/menus/item/ItemScanMenu.vue'
import LocationScanMenu from '@/components/scanning/menus/location/LocationScanMenu.vue'
import BoxScanMenu from '@/components/scanning/menus/box/BoxScanMenu.vue'

const props = defineProps({
  orderId: Array
})

var scannedObject = ref(null)

</script>

<style scoped>
</style>