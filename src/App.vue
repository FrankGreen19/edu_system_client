<template>
  <v-app>
    <v-container fluid>
      <HeaderBlock />
      <router-view />
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
    NavbarBlock
  }
}
</script>
