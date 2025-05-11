<template>
  <div>
    Pick Item Into Container: {{ store.state.activeOrder.orderContainer.filter(x => x.nextEventId == null)[0].containerId }}
    <v-btn @click="pickItemIntoContainer()">Confirm Pick</v-btn>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { PickItemIntoContainer } from '@/functions/functions'

const store = useStore()
const props = defineProps({
  item: Object
})

function pickItemIntoContainer() {
  PickItemIntoContainer(props.item.id, store.state.activeOrder.orderContainer.filter(x => x.nextEventId == null)[0].containerId)
  .then(response => {
    store.commit('updateActiveOrder', response.data)
  })
}
</script>

<style scoped>
</style>