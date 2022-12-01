<template>
  <v-app>
    <v-container fluid>
      <HeaderBlock />
      <ErrorsBlock />
      <LoaderBlock />
      <router-view style="padding-bottom: 108px"/>
      <FooterBlock />
    </v-container>
  </v-app>
</template>

<script>

import HeaderBlock from "@/components/HeaderBlock";
import FooterBlock from "@/components/FooterBlock";
import ErrorsBlock from "@/components/ErrorsBlock";
import LoaderBlock from "@/components/LoaderBlock";
export default {
  name: 'App',
  components: {
    LoaderBlock,
    ErrorsBlock,
    HeaderBlock,
    FooterBlock,
  },
}
</script>
