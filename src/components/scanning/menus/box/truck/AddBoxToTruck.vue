<template>
  <div>
    {{ box.id }}
    <v-btn @click="addToTruck()">Add Box To Truck</v-btn>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { AddBoxToTruck } from '@/functions/functions'

const store = useStore()
const props = defineProps({
  box: Object
})

function addToTruck() {
  AddBoxToTruck(props.box.id, store.state.activeShipment.truckData[0].id)
  .then(response => {
    store.commit('updateActiveShipment', response.data)
  })
}
</script>

<style scoped>
</style>