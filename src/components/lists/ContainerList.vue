<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="container in containers">
        <v-expansion-panel-title v-slot="{ expanded }">
          {{ container.id }}
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <ContainerData :containerData="container.containerData"></ContainerData>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
import ContainerData from '@/components/lists/data/ContainerData.vue'

const props = defineProps({
  containers: Array
})

</script>

<style scoped>
</style>
    