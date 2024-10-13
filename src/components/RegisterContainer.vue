<template>
  <div>
    <v-card>
      <v-text-field label="Container Id" v-model="containerId"></v-text-field>
    </v-card>
    <v-btn @click="addContainerToDatabase">Register Container</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      containerId: 0
    }
  },
  methods: {
    addContainerToDatabase() {
      axios.post('https://localhost:7187/Item/RegisterContainer', this.containerId)
      .then(response => console.log(response))
      .then(this.containerId = "")
    }
  }
}
</script>

<style scoped>
</style>
