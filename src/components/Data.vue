<template>
  <div>
    <div>
      <v-btn @click="dataToView = 1">Items</v-btn>
      <v-btn @click="dataToView = 2">Containers</v-btn>
      <v-btn @click="dataToView = 3">Orders</v-btn>
    </div>
    <div v-if="dataToView == 1">
      <Items />
    </div>
    <div v-else-if="dataToView == 2">
      <Containers />
    </div>
    <div v-else-if="dataToView == 3">
      <Orders />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Items from '@/components/Items.vue'
import Containers from '@/components/Containers.vue'
import Orders from '@/components/Orders.vue'

var dataToView = ref(0)
</script>

<style scoped>
</style>
  