<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="order in orders">
        <v-expansion-panel-title v-slot="{ expanded }">
          {{ order.id }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-btn
            v-if="order.orderBox.length == 0"
            @click="acknowledgeOrder(order)"
          >
            Acknowledge Order
          </v-btn>
          <OrderData :orderData="order.orderData"></OrderData>
          <ItemData :itemData="order.orderItems"></ItemData>
          <BoxData :boxData="order.orderBox"></BoxData>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog 
      v-model="openScanner"
      max-width="400"
    >
      <OrderScanMenu :order="orderToAddBoxTo"/>
    </v-dialog>
    
  </div>
</template>
  
<script setup>
import { ref } from 'vue'
import ItemData from '@/components/lists/data/ItemData.vue'
import OrderData from '@/components/lists/data/OrderData.vue'
import BoxData from '@/components/lists/data/BoxData.vue'
import OrderScanMenu from '../scanning/menus/order/OrderScanMenu.vue'

var openScanner = ref(false)
var orderToAddBoxTo = ref(false)

const props = defineProps({
  orders: Array
})

function acknowledgeOrder(order) {
  orderToAddBoxTo.value = order
  openScanner.value = true
}
</script>

<style scoped>
</style>
    