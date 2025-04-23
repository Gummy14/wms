<template>
  <div>
    <v-list v-for="box in boxes">
      <v-list-item 
        :title="box.boxDataHistory.find(x => x.nextEventId == null).name"
        :subtitle="box.id"
      >
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="box.boxDataHistory.find(x => x.nextEventId == null).dateTimeStamp"
            >
            </v-list-item>
          </template>
            
          <v-list-item
            v-for="boxDataHistoryEvent in box.boxDataHistory"
            :key="boxDataHistoryEvent.eventId"
            :title="boxDataHistoryEvent.dateTimeStamp"
          >
          </v-list-item>

        </v-list-group>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
const props = defineProps({
  boxes: Array
})

</script>

<style scoped>
</style>
      