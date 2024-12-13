<template>
  <div>
    <QrcodeStream @detect="onDetect" />
  </div>
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'
import { GetItemById, GetContainerDetailById } from '@/functions/functions'
const props = defineProps({
  mustVerify: Boolean
})
const emit = defineEmits(['codeScanned'])

function onDetect(detectedCodes) {
  var scanData = JSON.parse(detectedCodes[0].rawValue)
  if(props.mustVerify) {
    switch(scanData.ObjectType) {
      case 1:
        GetItemById(scanData.ObjectId)
        .then(response => {
          console.log('verfied Item')
          emit('codeScanned', response.data)
        })
        break
      case 2:
        GetContainerDetailById(scanData.ObjectId)
        .then(response => {
          console.log('verfied Container')
          emit('codeScanned', response.data)
        })
        break
    }
  } else {
    emit('codeScanned', scanData)
  }
}
</script>

<style scoped>
</style>
  