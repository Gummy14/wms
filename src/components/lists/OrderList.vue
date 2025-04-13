<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="order in orders">
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4">
              Order #{{ order.orderDataHistory.filter(x => x.nextEventId == null)[0].name }}
            </v-col>
            <v-col class="d-flex justify-end" cols="4">
              {{ order.orderDataHistory.filter(x => x.nextEventId == null)[0].status }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12">
              <v-btn 
                v-if="order.orderDataHistory.filter(x => x.nextEventId == null)[0].status == 510"
                @click="acknowledgeOrder(order.orderDataHistory.filter(x => x.nextEventId == null)[0].orderId)"
              >
                Acknowledge Order
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>Order ID:</v-col>
            <v-col>{{ order.orderDataHistory.filter(x => x.nextEventId == null)[0].orderId }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Status:</v-col>
            <v-col>{{ order.orderDataHistory.filter(x => x.nextEventId == null)[0].status }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Timestamp Of Last Status Change:</v-col>
            <v-col>{{ order.orderDataHistory.filter(x => x.nextEventId == null)[0].dateTimeStamp }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Container ID Assigned To Order:</v-col>
            <v-col v-if="isEmpty(order.containerUsedToFulfillOrder)">No Container Assigned To Fulfill Order</v-col>
            <v-col v-else>({{ order.containerUsedToFulfillOrder.containerId }})</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Order Items:</v-col>
          </v-row>
          <ItemList :items="order.orderItems" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

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
    