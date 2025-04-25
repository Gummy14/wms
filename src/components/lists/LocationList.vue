<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="location in locations">
        <v-expansion-panel-title v-slot="{ expanded }">
          {{ location.id }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <LocationData :locationData="location.locationData"></LocationData>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import LocationData from '@/components/lists/data/LocationData.vue'

const props = defineProps({
  locations: Array
})

</script>

<style scoped>
</style>
  