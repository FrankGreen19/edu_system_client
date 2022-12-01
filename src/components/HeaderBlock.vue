<template>
  <v-app-bar rounded class="mb-3">
    <v-toolbar-title @click="$router.push('/')">
      <span style="color: #1976D2">Сайтик с тестиками</span>
    </v-toolbar-title>
    <v-spacer />
    <v-btn class="mr-2 white--text" rounded color="orange lighten-1" @click="$router.push('login')">
      {{ username }}
    </v-btn>
  </v-app-bar>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'NavbarBlock',
  
  computed: {
    ...mapGetters(['getUser']),

    username() {
      return this.getUser?.full_name ? this.getUser.full_name : 'Войти';
    },
  }
}
</script>