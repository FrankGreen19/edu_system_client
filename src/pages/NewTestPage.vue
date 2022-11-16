<template>
  <v-row class="mt-2">
    <v-col class="mx-auto" cols="6">
      <v-card>
        <v-card-text>
          <v-text-field
              solo
              label="Название"
              hint="Название"
              v-model="test.title"/>
          <RadioGroup :items="test_utils.question_categories_radios" title="Из какой категории будем брать вопросы?"
                      v-model="question_category_radio"/>
          <RadioGroup :items="getTestTypes" title="Как будем создавать тест?" v-model="test.testTypeId"/>
          <div v-if="question_category_radio !== 0">
            <v-select
                :items="getQuestionCategoriesByRadioValue()"
                hint="Категория вопросов"
                label="Категория вопросов"
                item-text="title"
                item-value="id"
                solo
                v-model="test.questionCategoryId"
                @change="fetchQuestionsByCategory(test.questionCategoryId)"
            ></v-select>
          </div>
          <div v-if="test.testTypeId === test_utils.test_types.generated">
            <v-text-field
                solo
                label="Количество вопросов"
                hint="Количество вопросов"
                type="number"
                v-model="test.questionsNumber"/>
          </div>
          <DatePicker title="Дедлайн" v-model="test.finishDate"/>
          <v-text-field
              solo
              label="Время на выполнение (в минутах)"
              hint="Время на выполнение (в минутах)"
              type="number"
              v-model="test.executionTime"/>
          <div v-if="test.testTypeId === test_utils.test_types.custom">
            <CrazyMultipleSelect v-model="test.questions" :items="getQuestions" label="Выберете вопросы для теста"/>
          </div>

          <div class="text-center">
            <v-btn
                class="my-2"
                dark
                rounded
                value="Создать"
                @click="createNewTest(test)"
                color="orange">
              Создать
            </v-btn>
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import RadioGroup from "@/components/UI/RadioGroup";
import {test_utils} from '@/utils/testUtils';
import DatePicker from "@/components/UI/DatePicker";
import CrazyMultipleSelect from "@/components/UI/CrazyMultipleSelect";

export default {
  name: "NewTestPage",

  components: {CrazyMultipleSelect, DatePicker, RadioGroup},

  data: () => ({
    test_utils,
    question_category_radio: 0,
    test_type_generated: 18,
    test_type_custom: 17,
    test: {
      questionCategoryId: 0,
      testTypeId: 0,
      title: '',
      questionsNumber: '',
      finishDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      executionTime: 0,
      questions: []
    }
  }),

  mounted() {
    this.fetchTestTypes();
    this.fetchQuestionCategories();
  },

  methods: {
    ...mapActions(['fetchTestTypes', 'fetchQuestionCategories', 'fetchQuestionsByCategory', 'createNewTest']),

    getQuestionCategoriesByRadioValue()
    {
      switch (this.question_category_radio) {
        case 1:
          return this.getCommonQuestionCategories
        case 2:
          return this.getAuthoredQuestionCategories
      }
    },
  },

  computed: {
    ...mapGetters(['getTestTypes', 'getCommonQuestionCategories', 'getAuthoredQuestionCategories', 'getQuestions']),
  },
}
</script>