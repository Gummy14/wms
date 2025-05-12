<template>
  <div>
    Login
    <v-text-field
      label="Email address"
      type="email"
    >
    </v-text-field>
    <v-text-field
      label="Password"
      type="password"
    >
    </v-text-field>
    <v-btn
      @click="login()"
    >
    Login
    </v-btn>
  </div>
</template>

<script setup>
import router from '@/router';

function login() {
  router.replace('/home')
}
</script>

<style scoped>
</style>