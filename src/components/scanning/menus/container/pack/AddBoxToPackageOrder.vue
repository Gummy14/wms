<template>
  <div>
    Scan Box To Pack Items In:
    <Scanner @codeScanned="(emittedData) => scannedBoxToPackInto = emittedData" />
    <div v-if="scannedBoxToPackInto">
      Box Scanned
      <v-btn @click="addBoxToOrder()">Confirm Pack Items With Box</v-btn>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { AddBoxToOrder } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var scannedBoxToPackInto = ref(null)

const store = useStore()
const props = defineProps({
  container: Object
})

function addBoxToOrder() {
  AddBoxToOrder(props.container.containerData[0].orderId, scannedBoxToPackInto.value.objectData.id)
  .then(response => {
    store.commit('updateActiveOrder', response.data)
  })
}
</script>

<style scoped>
</style>