<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="shipment in shipments">
        <v-expansion-panel-title v-slot="{ expanded }">
          {{ shipment.id }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ShipmentData :shipmentData="shipment.shipmentData"></ShipmentData>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import ShipmentData from '@/components/lists/data/ShipmentData.vue'

const props = defineProps({
  shipments: Array
})

</script>

<style scoped>
</style>
        