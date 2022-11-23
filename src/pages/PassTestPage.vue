<template>
  <v-row>
    <v-col cols="6" class="mx-auto">
      <v-card>
        <v-card-text>
          <h3 style="color: #1976D2">{{ currentQuestion.description }}</h3>
          <v-text-field class="mt-4"
            solo dense
            label="Ответ"
            v-model="answer"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange lighten-1"
                 dark small
                 @click="showNextQuestion()"
          >
            Следующий
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import {testAPI} from "@/api/modules/testAPI";

export default {
  name: "PassTestPage",

  data: () => ({
    currentQuestion: {},
    answer: '',
    currentQuestionIdx: null,
  }),

  mounted() {
    this.createUserTest({
      userId: this.getUser.id,
      testId: this.getTestToPass.id,
    });
    this.currentQuestion = this.getTestToPass.questions[0];
    this.currentQuestionIdx = 0;
  },

  methods: {
    ...mapActions(['createUserTest']),

    showNextQuestion()
    {
      testAPI.postQuestionAnswer({
        userTestId: this.getUserTest.id,
        questionId: this.currentQuestion.questionId,
        answer: this.answer,
      }).then(() => {
        this.answer = '';

        this.currentQuestionIdx++;
        if (this.currentQuestionIdx < this.getTestToPass.questions.length) {
          this.currentQuestion = this.getTestToPass.questions[this.currentQuestionIdx];
        }
      });
    },

  },

  computed: {
    ...mapGetters(['getTestToPass', 'getUser', 'getTestToPass', 'getUserTest'])
  }
}
</script>

<style scoped>

</style>