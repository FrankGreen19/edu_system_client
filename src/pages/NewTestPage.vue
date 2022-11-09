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
          <RadioGroup :items="TEST_UTILS.QUESTION_CATEGORY_RADIOS" title="Из какой категории будем брать вопросы?"
                      v-model="question_category_radio"/>
          <RadioGroup :items="getTestTypes" title="Как будем создавать тест?" v-model="test.test_type_id"/>
          <div v-if="question_category_radio !== 0">
            <v-select
                :items="getQuestionCategoriesByRadioValue()"
                hint="Категория вопросов"
                label="Категория вопросов"
                item-text="title"
                item-value="id"
                solo
                v-model="question_category_id"
                @change="fetchQuestionsByCategory({question_category_id})"
            ></v-select>
          </div>
          <div v-if="test.test_type_id === TEST_UTILS.TEST_TYPES.GENERATED">
            <v-text-field
                solo
                label="Количество вопросов"
                hint="Количество вопросов"
                v-model="test.questions_number"/>
          </div>
          <DatePicker title="Дедлайн" v-model="test.finish_date"/>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import RadioGroup from "@/components/UI/RadioGroup";
import {TEST_UTILS} from '@/utils/testUtils';
import DatePicker from "@/components/UI/DatePicker";

export default {
  name: "NewTestPage",

  components: {DatePicker, RadioGroup},

  data: () => ({
    TEST_UTILS,
    question_category_radio: 0,
    question_category_id: null,
    test_type_generated: 18,
    test_type_custom: 17,
    test: {
      test_type_id: 0,
      test_theme: '',
      title: '',
      questions_number: '',
      finish_date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    }
  }),

  mounted() {
    this.fetchTestTypes();
    this.fetchQuestionCategories();
  },

  methods: {
    ...mapActions(['fetchTestTypes', 'fetchQuestionCategories', 'fetchQuestionsByCategory']),

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
    ...mapGetters(['getTestTypes', 'getCommonQuestionCategories', 'getAuthoredQuestionCategories']),
  },
}
</script>