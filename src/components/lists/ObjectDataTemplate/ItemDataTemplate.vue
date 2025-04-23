<template>
  <div>
    <v-container>
      <v-row>
        <v-col>DateTimeStamp</v-col><v-col>{{ itemData.dateTimeStamp }}</v-col>
      </v-row>
      <v-row>
        <v-col>Description</v-col><v-col>{{ itemData.description }}</v-col>
      </v-row>
      <v-row>
        <v-col>LengthInCentimeters</v-col><v-col>{{ itemData.lengthInCentimeters }}</v-col>
      </v-row>
      <v-row>
        <v-col>WidthInCentimeters</v-col><v-col>{{ itemData.widthInCentimeters }}</v-col>
      </v-row>
      <v-row>
        <v-col>HeightInCentimeters</v-col><v-col>{{ itemData.heightInCentimeters }}</v-col>
      </v-row>
      <v-row>
        <v-col>WeightInKilograms</v-col><v-col>{{ itemData.weightInKilograms }}</v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
const props = defineProps({
  itemData: Object
})
</script>

<style scoped>
</style>
    