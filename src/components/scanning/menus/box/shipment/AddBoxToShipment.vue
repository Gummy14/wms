<template>
  <div>
    <div v-if="statusFlag == 0">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <div v-if="statusFlag == 1">
      <v-alert type="error">Not All Items Picked</v-alert>
    </div>
    <div v-else-if="statusFlag == 2">
      {{ box.id }}
      Expected Box Weight: {{ parentOrder.orderItems.reduce((sum, item) => sum + item.weightInKilograms, 0) }}
      <v-text-field label="Measure Box Weight" v-model="measuredBoxWeight"></v-text-field>
      <v-btn @click="verifyBoxWeight()">Verify Box Weight</v-btn>
      <v-alert v-if="!isWeightVerified && hasVerifiedWeightBefore" type="error">Measured Box Weight Does Not Match Expected</v-alert>
      <v-alert v-if="isWeightVerified && hasVerifiedWeightBefore" type="success">Weight Verified</v-alert>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { GetOrderById, AddBoxToShipment } from '@/functions/functions'

const store = useStore()

var measuredBoxWeight = ref(0.0)
var isWeightVerified = ref(false)
var statusFlag = ref(0)
var hasVerifiedWeightBefore = ref(false)
var parentOrder = ref(null)

const props = defineProps({
  box: Object
})

function verifyBoxWeight() {
  var totalWeight = parentOrder.value.orderItems.reduce((sum, item) => sum + item.weightInKilograms, 0)
  if(measuredBoxWeight.value == totalWeight)
  {
    hasVerifiedWeightBefore.value = true
    isWeightVerified.value = true
    addToShipment()
  }
  else
  {
    hasVerifiedWeightBefore.value = true
    isWeightVerified.value = false
  }
}

function addToShipment() {
  AddBoxToShipment(props.box.id)
  .then(() => {
    console.log('Label Printed')
  })
}
onMounted(() => {
  GetOrderById(props.box.boxData.find(x => x.nextEventId == null).orderId)
  .then(response => {
    parentOrder.value = response.data
    parentOrder.value.orderItems.length == props.box.boxItems.length ? statusFlag.value = 2 : statusFlag.value = 1
  })
})
</script>

<style scoped>
</style>