<template>
  <div>
    <v-content v-for="box in boxData">
      <v-row>
        <v-col>Name:</v-col>
        <v-col>{{ box.name }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Description:</v-col>
        <v-col>{{ box.description }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Box ID:</v-col>
        <v-col>{{ box.boxId }}</v-col>
      </v-row>
      <v-divider class="border-opacity-25"></v-divider>
      <v-row>
        <v-col>Timestamp Of Last Event Type Change:</v-col>
        <v-col>{{ box.dateTimeStamp }}</v-col>
      </v-row>
    </v-content>
  </div>
</template>

<script setup>
const props = defineProps({
  boxData: Array
})

</script>

<style scoped>
</style>
        