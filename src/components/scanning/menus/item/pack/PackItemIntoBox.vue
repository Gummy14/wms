<template>
  <div>
    Pack Item Into Box: {{ store.state.activeOrder.orderBox.filter(x => x.nextEventId == null)[0].boxId }}
    <v-btn @click="packItemIntoBox()">Confirm Pack</v-btn>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { PackItemIntoBox } from '@/functions/functions'

const store = useStore()
const props = defineProps({
  item: Object
})

function packItemIntoBox() {
  PackItemIntoBox(props.item.id, store.state.activeOrder.orderBox.filter(x => x.nextEventId == null)[0].boxId)
  .then(response => {
    store.commit('updateActiveOrder', response.data)
  })
}
</script>

<style scoped>
</style>