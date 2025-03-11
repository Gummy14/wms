<template>
  <div>
    <div v-if="!retrievedAllWarehouseObjects">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-else>
      <v-card>
        <WarehouseObjectList :warehouseObjects="allWarehouseObjects" />
      </v-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { GetAllWarehouseObjects } from '@/functions/functions'
import WarehouseObjectList from '@/components/lists/WarehouseObjectList.vue'

var retrievedAllWarehouseObjects = ref(false)
var allWarehouseObjects = ref(null)

onMounted(() => {
  GetAllWarehouseObjects()
  .then(response => {
    allWarehouseObjects.value = response.data
    retrievedAllWarehouseObjects.value = true
  })
})
</script>

<style scoped>
</style>
    