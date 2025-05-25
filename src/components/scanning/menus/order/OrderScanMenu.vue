<template>
  <div>
    <v-card
      :title="order.orderData[0].name"
      :text="order.orderData[0].description"
    >
      <AddBoxToPickOrder
        v-if="actionSelected = 1"
        :order="order"
      />
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AddBoxToPickOrder from './pick/AddBoxToPickOrder.vue'

var actionSelected = ref(1)

const props = defineProps({
  order: Object
})
</script>

<style scoped>
</style>