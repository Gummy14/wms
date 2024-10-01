<template>
  <div>
    <v-btn @click="openPutaway">Putaway</v-btn>
    <v-btn @click="openPick">Pick</v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    openPutaway() {
        this.$router.replace('/putaway')
    },
    openPick() {
        this.$router.replace('/pick')
    }
  }
}
</script>

<style scoped>
</style>
