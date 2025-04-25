<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="box in boxes">
        <v-expansion-panel-title v-slot="{ expanded }">
          {{ box.id }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <BoxData :boxData="box.boxData"></BoxData>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import BoxData from '@/components/lists/data/BoxData.vue'

const props = defineProps({
  boxes: Array
})

</script>

<style scoped>
</style>
      