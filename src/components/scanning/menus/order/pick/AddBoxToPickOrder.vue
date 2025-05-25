<template>
  <div>
    Scan Box To Add To Order
    <Scanner @codeScanned="(emittedData) => scannedBox = emittedData" />
    <div v-if="scannedBox">
      Box Scanned {{ scannedBox.objectData.id }}
      <v-btn @click="addBoxToOrder()">Add Box To Order</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { AddBoxToOrder } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var scannedBox = ref(null)

const store = useStore()
const props = defineProps({
  order: Object
})

function addBoxToOrder() {
  AddBoxToOrder(props.order.id, scannedBox.value.objectData.id)
  .then(response => {
    store.commit('updateActiveOrder', response.data)
  })
}
</script>

<style scoped>
</style>