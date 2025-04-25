<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="order in orders">
        <v-expansion-panel-title v-slot="{ expanded }">
          {{ order.id }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <OrderData :orderData="order.orderData"></OrderData>
          <ItemData :itemData="order.orderItems"></ItemData>
          <ContainerData :containerData="order.orderContainer"></ContainerData>
          <BoxData :boxData="order.orderBox"></BoxData>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
  
<script setup>
import ItemData from '@/components/lists/data/ItemData.vue'
import OrderData from '@/components/lists/data/OrderData.vue'
import ContainerData from '@/components/lists/data/ContainerData.vue'
import BoxData from '@/components/lists/data/BoxData.vue'

const props = defineProps({
  orders: Array
})

</script>

<style scoped>
</style>
    