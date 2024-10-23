<template>
  <div>
    <div>
      <v-card>
        <v-text-field label="Container Id" v-model="containerToPickFrom"></v-text-field>
      </v-card>
      <v-btn @click="getItemById">Find Container</v-btn>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      containerToPickFrom: 0
    }
  },
  methods: {
  },
  mounted() {
  }
}
</script>

<style scoped>
</style>
