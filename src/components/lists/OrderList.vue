<template>
  <div>
    <v-list v-for="order in orders">
      <v-list-item 
        :title="order.orderDataHistory.find(x => x.nextEventId == null).name"
        :subtitle="order.id"
      >
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item
              v-bind="props"
              :title="order.orderDataHistory.find(x => x.nextEventId == null).dateTimeStamp"
            >
            </v-list-item>
          </template>
            
          <v-list-item
            v-for="orderDataHistoryEvent in order.orderDataHistory"
            :key="orderDataHistoryEvent.eventId"
            :title="orderDataHistoryEvent.dateTimeStamp"
          >
          </v-list-item>

        </v-list-group>
      </v-list-item>
    </v-list>
    <v-dialog 
      v-model="openScanner"
      max-width="400"
    >
      <ObjectScanner :orderId="orderIdToAddContainerTo"/>
    </v-dialog>
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import ItemList from '@/components/lists/ItemList.vue'
import ObjectScanner from '@/components/ObjectScanner.vue'

var openScanner = ref(false)
var orderIdToAddContainerTo = ref(false)
const props = defineProps({
  orders: Array
})

function isEmpty(id) {
  return id == null ? true : false
}
function acknowledgeOrder(orderId) {
  orderIdToAddContainerTo.value = orderId
  openScanner.value = true
}
</script>

<style scoped>
</style>
    