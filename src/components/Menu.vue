<template>
  <div>
    <v-btn @click="openPutaway">Putaway</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    openPutaway() {
        this.$router.replace('/putaway')
    }
  }
}
</script>

<style scoped>
</style>
