<template>
  <v-app>
    <v-container fluid>
      <NavbarBlock />
      <router-view />
      <FooterBlock />
    </v-container>
  </v-app>
</template>

<script>

import NavbarBlock from "@/components/NavbarBlock";
import FooterBlock from "@/components/FooterBlock";

export default {
  name: 'App',
  components: {
    FooterBlock,
    NavbarBlock
  }
}
</script>
