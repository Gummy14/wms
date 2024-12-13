<template>
  <div>
    <QrcodeStream @detect="onDetect" />
  </div>
</template>

<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'

const emit = defineEmits(['codeScanned'])

function onDetect(detectedCodes) {
  emit('codeScanned', JSON.parse(detectedCodes[0].rawValue))
}
</script>

<style scoped>
</style>
  