<template>
  <v-app>
    <v-container fluid>
      <HeaderBlock />
      <ErrorsBlock />
      <router-view style="padding-bottom: 108px"/>
      <FooterBlock />
    </v-container>
  </v-app>
</template>

<script>

import HeaderBlock from "@/components/HeaderBlock";
import FooterBlock from "@/components/FooterBlock";
import ErrorsBlock from "@/components/ErrorsBlock";
export default {
  name: 'App',
  components: {
    ErrorsBlock,
    HeaderBlock,
    FooterBlock,
  },
}
</script>
