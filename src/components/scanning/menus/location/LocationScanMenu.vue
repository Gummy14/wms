<template>
  <div>
    <v-card
      :title="locationName(location.locationData[0])"
      :text="location.locationData[0].description"
    >
      <div v-if="actionSelected == 0">
        <v-btn
          @click="actionSelected = 1"
        >
          Get Location History
        </v-btn>
      </div>

      <LocationHistory
        v-if="actionSelected == 1"
        :location="location"
      />
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import LocationHistory from './history/LocationHistory.vue'

var actionSelected = ref(0)

const props = defineProps({
  location: Object
})

function locationName(location) {
  return 'Z' + location.zone.toString() + "-S" + location.shelf.toString() + "-R" + location.row.toString() + "-C" + location.column.toString()
}
</script>

<style scoped>
</style>