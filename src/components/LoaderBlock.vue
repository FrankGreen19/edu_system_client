<template>
  <div class="text-center">
    <v-overlay :value="isLoaderVisible">
      <v-progress-circular
          color="orange lighten-1"
          indeterminate
          size="80"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "LoaderBlock",

  computed: {
    ...mapGetters(['isLoaderVisible']),
  },
}
</script>