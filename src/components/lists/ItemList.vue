<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="item in items">
        <v-expansion-panel-title v-slot="{ expanded }">
          {{ item.id }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ItemData :itemData="item.itemData"></ItemData>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import ItemData from '@/components/lists/data/ItemData.vue'

const props = defineProps({
  items: Array
})

</script>

<style scoped>
</style>
  