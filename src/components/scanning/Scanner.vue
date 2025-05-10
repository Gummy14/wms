<template>
  <div>
    <QrcodeStream @detect="onDetect" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { GetItemById, GetLocationById, GetContainerById, GetBoxById } from '@/functions/functions'
const emit = defineEmits(['codeScanned'])

async function onDetect(detectedCodes) {
  var scanDataType = Number(detectedCodes[0].rawValue.slice(0,1))
  var scanDataId = detectedCodes[0].rawValue.slice(2)
  var responseData = ref(null)

  switch(scanDataType) {
    case 0:
      await GetItemById(scanDataId)
      .then(response => {
        responseData.value = response.data
      })
      break
    case 1:
      await GetLocationById(scanDataId)
      .then(response => {
        responseData.value = response.data
      })
      break
    case 2:
      await GetContainerById(scanDataId)
      .then(response => {
        console.log('response c', response)
        responseData.value = response.data
      })
      break
    case 4:
      await GetBoxById(scanDataId)
      .then(response => {
        responseData.value = response.data
      })
      break
    default:
      break
  }
  var responseDataWithObjectType = {
    objectData: responseData.value,
    objectType: scanDataType
  }
  emit('codeScanned', responseDataWithObjectType)
}
</script>

<style scoped>
</style>
  