<template>
  <v-row>
    <v-col cols="6" class="mx-auto">
      <v-card v-if="!testEnded">
        <v-card-text v-if="!testEnded">
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
      <v-card v-else class="text-md-center">
        <v-card-text class="mx-auto">
          <p class="text-h4" style="color: #1976D2">Тест завершен</p>
          <AnswerItem
              v-for="answer in getTestQuestionAnswers"
              :key="answer.id"
              :answer="answer"
          />
          <br><br>
          <h3 style="color: #1976D2">Результат: {{ getUserTest.result }}%</h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="orange lighten-1"
                 right
                 dark small
                 @click="$router.push('/')"
          >
            На главную страницу
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from "vuex";
import AnswerItem from "@/components/AnswerItem";

export default {
  name: "PassTestPage",
  components: {AnswerItem},
  data: () => ({
    currentQuestion: {},
    answer: '',
    currentQuestionIdx: null,
    testEnded: false,
  }),

  mounted() {
    this.createUserTest({
      userId: this.getUser.id,
      testId: this.getTestToPass.id,
    });
    this.currentQuestion = this.getTestToPass.questions[0];
    this.currentQuestionIdx = 0;
    this.setTestQuestionAnswers([]);
  },

  methods: {
    ...mapActions(['createUserTest', 'createQuestionAnswer', 'updateUserTest']),
    ...mapMutations(['setTestQuestionAnswers']),

    showNextQuestion()
    {
      this.createQuestionAnswer({
        userTestId: this.getUserTest.id,
        questionId: this.currentQuestion.questionId,
        answer: this.answer,
      }).then(() => {
        this.answer = '';

        this.currentQuestionIdx++;
        if (this.currentQuestionIdx < this.getTestToPass.questions.length) {
          this.currentQuestion = this.getTestToPass.questions[this.currentQuestionIdx];
        } else {
          this.updateUserTest(this.getUserTest)
            .then(() => {
              this.testEnded = true;
            });
        }
      });
    },

  },

  computed: {
    ...mapGetters(['getTestToPass', 'getUser', 'getTestToPass', 'getUserTest', 'getTestQuestionAnswers'])
  }
}
</script>

<style scoped>

</style>