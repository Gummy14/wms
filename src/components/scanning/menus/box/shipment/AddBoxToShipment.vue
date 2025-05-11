<template>
  <div>
    {{ box.id }}
    <v-btn @click="addToShipment()">Print Shipping Label</v-btn>
  </div>
</template>

<script setup>
import { AddBoxToShipment } from '@/functions/functions'

const props = defineProps({
  box: Object
})

function addToShipment() {
  AddBoxToShipment(props.box.id)
  .then(() => {
    console.log('Label Printed')
  })
}
</script>

<style scoped>
</style>