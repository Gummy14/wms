<template>
  <div>
    <v-list v-for="location in locations">
      <v-list-item 
        :title="location.locationDataHistory.find(x => x.nextEventId == null).name"
        :subtitle="location.id"
      >
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="location.locationDataHistory.find(x => x.nextEventId == null).dateTimeStamp"
            >
            </v-list-item>
          </template>
            
          <v-list-item
            v-for="locationDataHistoryEvent in location.locationDataHistory"
            :key="locationDataHistoryEvent.eventId"
            :title="locationDataHistoryEvent.dateTimeStamp"
          >
          </v-list-item>

        </v-list-group>
      </v-list-item>
    </v-list>
  </div>
</template>
  
<script setup>
const props = defineProps({
  locations: Array
})

function isEmpty(id) {
  return id == null ? true : false
}
</script>

<style scoped>
</style>
      