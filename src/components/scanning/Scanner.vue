<template>
  <div>
    <QrcodeStream @detect="onDetect" />
  </div>
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'
import { GetWarehouseObjectById } from '@/functions/functions'
const props = defineProps({
  mustVerify: Boolean
})
const emit = defineEmits(['codeScanned'])

function onDetect(detectedCodes) {
  var scanData = JSON.parse(detectedCodes[0].rawValue)
  if(props.mustVerify) {
    GetWarehouseObjectById(scanData.ObjectId)
    .then(response => {
      console.log('verfied object', response.data)
      emit('codeScanned', response.data)
    })
  } else {
    emit('codeScanned', scanData)
  }
}
</script>

<style scoped>
</style>
  