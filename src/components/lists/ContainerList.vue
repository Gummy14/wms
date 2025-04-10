<template>
  <div>
    <v-expansion-panels variant="accordion">
      <v-expansion-panel v-for="container in containers">
        <v-expansion-panel-title v-slot="{ expanded }">
          <v-row no-gutters>
            <v-col class="d-flex justify-start" cols="8">
              {{ container.name }}
            </v-col>
            <v-col class="d-flex justify-end" cols="4">
              {{ container.status }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-row>
            <v-col>Description:</v-col>
            <v-col>{{ container.description }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Container ID:</v-col>
            <v-col>{{ container.containerId }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Status:</v-col>
            <v-col>{{ container.status }}</v-col>
          </v-row>
          <v-divider class="border-opacity-25"></v-divider>
          <v-row>
            <v-col>Timestamp Of Last Status Change:</v-col>
            <v-col>{{ container.dateTimeStamp }}</v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script setup>
const props = defineProps({
  containers: Array
})

</script>

<style scoped>
</style>
    