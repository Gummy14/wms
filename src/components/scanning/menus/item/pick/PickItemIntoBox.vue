<template>
  <div>
    Pick Item Into Box: {{ store.state.activeOrder.orderBox.filter(x => x.nextEventId == null)[0].boxId }}
    <v-btn @click="pickItemIntoBox()">Confirm Pack</v-btn>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { PickItemIntoBox } from '@/functions/functions'

const store = useStore()
const props = defineProps({
  item: Object
})

function pickItemIntoBox() {
  PickItemIntoBox(props.item.id, store.state.activeOrder.orderBox.filter(x => x.nextEventId == null)[0].boxId)
  .then(response => {
    store.commit('updateActiveOrder', response.data)
  })
}
</script>

<style scoped>
</style>