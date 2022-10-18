<template>
  <v-app>
    <NavbarBlock />
    <router-view />
    <FooterBlock />
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
