<template>
  <div>
    <QrcodeStream @detect="onDetect" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import { GetItemById, GetLocationById, GetContainerById } from '@/functions/functions'
const props = defineProps({
  mustVerify: Boolean
})
const emit = defineEmits(['codeScanned'])

async function onDetect(detectedCodes) {
  var scanData = JSON.parse(detectedCodes[0].rawValue)
  if(props.mustVerify) {
    var responseData = ref(null)
    switch(scanData.ObjectType) {
      case 0:
        await GetItemById(scanData.Id)
        .then(response => {
          responseData.value = response.data
        })
        break
      case 1:
        await GetLocationById(scanData.Id)
        .then(response => {
          responseData.value = response.data
        })
        break
      case 2:
        await GetContainerById(scanData.Id)
        .then(response => {
          responseData.value = response.data
        })
        break
      default:
        break
    }
    var responseDataWithObjectType = {
      objectData: responseData.value,
      objectType: scanData.ObjectType
    }
    emit('codeScanned', responseDataWithObjectType)
  } else {
    console.log('scanData', scanData)
    emit('codeScanned', scanData)
  }
}
</script>

<style scoped>
</style>
  