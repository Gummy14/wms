<template>
  <div>
    <QrcodeStream @detect="onDetect" />
  </div>
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'
import { GetItemById, GetLocationById } from '@/functions/functions'
const props = defineProps({
  mustVerify: Boolean
})
const emit = defineEmits(['codeScanned'])

function onDetect(detectedCodes) {
  var scanData = JSON.parse(detectedCodes[0].rawValue)
  if(props.mustVerify) {
    switch(scanData.ObjectType) {
      case 0:
        GetItemById(scanData.ObjectId)
        .then(response => {
          console.log('verfied item', response.data)
          emit('codeScanned', response.data)
        })
        break
      case 1:
        GetLocationById(scanData.ObjectId)
        .then(response => {
          console.log('verfied location', response.data)
          emit('codeScanned', response.data)
        })
        break
      default:
        break
    }
  } else {
    emit('codeScanned', scanData)
  }
}
</script>

<style scoped>
</style>
  