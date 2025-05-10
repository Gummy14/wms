<template>
  <div>
    <v-card
      :title="order.orderData[0].name"
      :text="order.orderData[0].description"
    >
      <div v-if="actionSelected == 1">
        Scan Container To Add To Order
        <Scanner @codeScanned="(emittedData) => scannedContainer = emittedData" />
        <div v-if="scannedContainer">
          Container Scanned {{ scannedContainer.objectData.id }}
          <v-btn @click="addContainerToOrder()">Add Container To Order</v-btn>
        </div>
      </div>

    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { AddContainerToOrder } from '@/functions/functions'
import Scanner from '@/components/scanning/Scanner.vue'

var actionSelected = ref(1)
var scannedContainer = ref(null)

const store = useStore()
const props = defineProps({
  order: Object
})

function addContainerToOrder() {
  AddContainerToOrder(props.order.id, scannedContainer.value.objectData.id)
  .then(response => {
    store.commit('updateActiveOrder', response.data)
  })
}
</script>

<style scoped>
</style>