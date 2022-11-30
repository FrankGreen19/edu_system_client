<template>
  <v-card dark color="red lighten-3" class="mb-3" v-if="getErrors.length">
    <v-card-text>
      <div v-for="(error, idx) in getErrors" :key="idx" style="margin-top: 3px">
        <span>
        {{error.propertyPath ? error.propertyPath + ':' : ''}} {{ error.title }}
      </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ErrorsBlock",

  computed: {
    ...mapGetters(['getErrors']),
  },
}
</script>

<style scoped>

</style>