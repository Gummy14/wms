<template>
  <div>
    <v-list v-for="item in items">
      <v-list-item 
        :title="item.itemDataHistory.find(x => x.nextEventId == null).name"
        :subtitle="item.id"
      >
        <ItemDataTemplate 
          :item-data="item.itemDataHistory.find(x => x.nextEventId == null)"
        >
        </ItemDataTemplate>

        <v-list-group v-if="item.itemDataHistory.length > 1">
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              title="History"
            >
            </v-list-item>
          </template>
          <v-list-item
            v-for="itemDataHistoryEvent in item.itemDataHistory.filter(x => x.nextEventId != null)"
            :key="itemDataHistoryEvent.eventId"
            :title="itemDataHistoryEvent.dateTimeStamp"
          >
          </v-list-item>
        </v-list-group>
      </v-list-item>
      <v-divider></v-divider>
    </v-list>
  </div>
</template>

<script setup>
import ItemDataTemplate from '@/components/lists/ObjectDataTemplate/ItemDataTemplate.vue'
const props = defineProps({
  items: Array
})

function isEmpty(id) {
  return id == null ? true : false
}
</script>

<style scoped>
</style>
  