<template>
  <li>
    {{ answer.questionDescription }}
    <p style="color: black">
      Ответ: {{ answer.answer }}
      <v-icon
          color="green lighten-1"
          v-if="answer.correct === true"
          right
      >
        mdi-checkbox-marked-circle
      </v-icon>
      <v-icon
          color="red lighten-1"
          v-else
          right
      >
        mdi-cancel
      </v-icon>
    </p>
  </li>
</template>

<script>
export default {
  name: "AnswerItem",

  props: {
    answer: {
      type: Object,
      required: true,
    },
  }
}
</script>

<style scoped>

</style>