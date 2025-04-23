<template>
  <div>
    <v-list v-for="container in containers">
      <v-list-item 
        :title="container.containerDataHistory.find(x => x.nextEventId == null).name"
        :subtitle="container.id"
      >
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="container.containerDataHistory.find(x => x.nextEventId == null).dateTimeStamp"
            >
            </v-list-item>
          </template>
            
          <v-list-item
            v-for="containerDataHistoryEvent in container.itemDataHistory"
            :key="containerDataHistoryEvent.eventId"
            :title="containerDataHistoryEvent.dateTimeStamp"
          >
          </v-list-item>

        </v-list-group>
      </v-list-item>
    </v-list>
  </div>
</template>

<script setup>
const props = defineProps({
  containers: Array
})

function isEmpty(id) {
  return id == null ? true : false
}

</script>

<style scoped>
</style>
    