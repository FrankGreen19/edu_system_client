<template>
  <v-row>
    <v-col cols="6" class="mx-auto">
      <v-card>
        <v-card-text>
          <v-text-field
              dense
              outlined
              label="Название"
              v-model="category.title"
          />
          <v-btn
              small
              dark
              rounded
              color="orange lighten-1"
              @click="addQuestion"
          >
            <v-icon>mdi-plus</v-icon> добавить вопрос
          </v-btn>
          <div v-if="category.questions.length" class="mt-3">
            <v-card v-for="question in category.questions" :key="question.id" class="mt-1">
              <v-card-text>
                <v-text-field
                    dense
                    outlined
                    label="Вопрос"
                    v-model="question.description"
                />
                <v-text-field
                    dense
                    outlined
                    label="Ответ"
                    v-model="question.answer"
                />
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark small color="blue lighten-1" @click="saveCategory">Сохранить</v-btn>
          <v-btn dark small color="orange lighten-1" @click="$router.push('/categories')">Отменить</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: "NewCategoryPage",

  data: () => ({
    category: {
      title: "",
      questions: []
    },
  }),

  methods: {
    ...mapActions(['addQuestionCategory']),

    addQuestion()
    {
      this.category.questions.push({
        description: '',
        answer: '',
      })
    },

    saveCategory()
    {
      this.addQuestionCategory(this.category)
        .then(() => {this.$router.push('/categories')});
    },
  }
}
</script>

<style scoped>

</style>