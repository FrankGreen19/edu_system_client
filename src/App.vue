<template>
  <v-app>
    <v-container fluid>
      <HeaderBlock />
      <router-view style="padding-bottom: 108px"/>
      <FooterBlock />
    </v-container>
  </v-app>
</template>

<script>

import HeaderBlock from "@/components/HeaderBlock";
import FooterBlock from "@/components/FooterBlock";
export default {
  name: 'App',
  components: {
    HeaderBlock,
    FooterBlock,
  },

  mounted() {
    // if (localStorage.getItem('token') && this.$store.getters.getUser == null) {
    //   console.log('yes')
    //   this.$store.dispatch('fetchUser');
    // }
  }
}
</script>
