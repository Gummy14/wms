<template>
  <div>
    <v-card
      :title="location.locationData[0].name"
      :text="location.locationData[0].description"
    >

      <div v-if="actionSelected == 0">
        <v-btn
          @click="getLocationHistory()"
        >
          Get Location History
        </v-btn>
      </div>

      <div v-if="actionSelected == 1">
        Location History:
        <div v-for="locationData in location.locationData">
          {{ locationData.eventId }}
        </div>
      </div>

    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

var actionSelected = ref(0)

const props = defineProps({
  location: Object
})

function getLocationHistory() {
  actionSelected.value = 1
}
</script>

<style scoped>
</style>