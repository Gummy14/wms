<template>
  <div>
    <v-card
      :title="item.itemData[0].name"
      :text="item.itemData[0].description"
    >
      <div v-if="actionSelected == 0">
        <v-btn
          @click="selectForPutaway()"
        >
          Select For Putaway
        </v-btn>
        <v-btn
          @click="actionSelected = 3"
        >
          Select For Picking
        </v-btn>
        <v-btn
          @click="actionSelected = 4"
        >
          Get Item History
        </v-btn>
      </div>

      <PutawayItemIntoLocation 
        v-if="actionSelected == 1"
        :item="item"
        :locationToPutaway="putawayLocation" 
      />

      <PickItemIntoBox 
        v-if="actionSelected == 3"
        :item="item"
      />

      <ItemHistory
        v-if="actionSelected == 4"
        :item="item"
      />
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { GetPutawayLocation } from '@/functions/functions'
import PutawayItemIntoLocation from './putaway/PutawayItemIntoLocation.vue'
import PickItemIntoBox from './pick/PickItemIntoBox.vue'
import ItemHistory from './history/ItemHistory.vue'

var actionSelected = ref(0)
var putawayLocation = ref(null)

const props = defineProps({
  item: Object
})

function selectForPutaway() {
  GetPutawayLocation()
  .then(response => {
    putawayLocation.value = response.data
    actionSelected.value = 1
  })
}
</script>

<style scoped>
</style>