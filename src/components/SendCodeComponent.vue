<template>
  <v-row>
    <v-col cols="4">
      <v-text-field
          outlined
          label="Код теста"
          v-model="testCode"
      />
      <v-btn color="orange lighten-1"
             dark
             @click="fetchTestByCode(testCode)"
      >
        Пройти
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "SendCodeComponent",

  data: () => ({
    testCode: '',
  }),

  methods: {
    ...mapActions(['fetchTestByCode']),
  }
}
</script>

<style scoped>

</style>