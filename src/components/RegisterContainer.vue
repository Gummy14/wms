<template>
  <div>
    <v-card>
      <v-text-field label="Container Name" v-model="containerToRegister.name"></v-text-field>
    </v-card>
    <v-btn @click="addContainerToDatabase">Register Container</v-btn>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      containerToRegister: {
        name: ""
      }
    }
  },
  methods: {
    addContainerToDatabase() {
      axios.post('https://localhost:7187/WMS/RegisterContainer', this.containerToRegister)
      .then(response => console.log(response))
      .then(this.resetFields())
    },
    resetFields() {
      this.containerToRegister = {
        name: ""
      }
    }
  }
}
</script>

<style scoped>
</style>
