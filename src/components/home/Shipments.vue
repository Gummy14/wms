<template>
  <div>
    <div v-if="!retrievedAllShipments">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <ShipmentList :shipments="allShipments" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllShipmentsMostRecentData } from '@/functions/functions'
import ShipmentList from '@/components/lists/ShipmentList.vue'

var retrievedAllShipments = ref(false)
var allShipments = ref(null)

onMounted(() => {
  GetAllShipmentsMostRecentData()
  .then(response => {
    console.log('test', response.data)
    allShipments.value = response.data
    retrievedAllShipments.value = true
  })
})
</script>

<style scoped>
</style>
    