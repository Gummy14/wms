<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="order in orders">
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="4">
              Order #{{ order.name }}
            </v-col>
            <v-col class="d-flex justify-end" cols="4">
              {{ order.status }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col cols="12">
              <v-btn 
                v-if="order.status == 510"
                @click="acknowledgeOrder(order.id)"
              >
                Acknowledge Order
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col>Order ID:</v-col>
            <v-col>{{ order.id }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Status:</v-col>
            <v-col>{{ order.status }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Timestamp Of Last Status Change:</v-col>
            <v-col>{{ order.dateTimeStamp }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Order Items:</v-col>
          </v-row>
          <ItemList :items="order.orderItems" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
  
<script setup>
import ItemList from '@/components/lists/ItemList.vue'
import { UpdateOrderSelectForPicking } from '@/functions/functions'

const props = defineProps({
  orders: Array
})

function acknowledgeOrder(orderId) {
  UpdateOrderSelectForPicking(orderId)
  .then(() => {
    console.log("acknowledged")
  })
}
</script>

<style scoped>
</style>
    