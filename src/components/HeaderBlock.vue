<template>
  <v-app-bar rounded class="mb-5">
    <v-toolbar-title @click="$router.push('/')">
      <span style="color: #1976D2">Сайтик с тестиками</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn class="mr-2 white--text" rounded color="orange lighten-1" @click="$router.push('login')">Войти</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'NavbarBlock',

  components: {
  },
}
</script>