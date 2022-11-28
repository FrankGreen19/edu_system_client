<template>
  <v-card class="mt-3">
    <v-card-text>
      <v-text-field
          dense
          outlined
          label="Вопрос"
          :value="question.description"
          :disabled="!editMode"
      />
      <v-text-field
          dense
          outlined
          label="Ответ"
          :value="question.answer"
          :disabled="!editMode"
      />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "QuestionItem",

  props: {
    question: {
      type: Object,
      required: true,
    },
    editMode: Boolean,
  }
}
</script>

<style scoped>

</style>