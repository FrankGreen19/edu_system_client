<template>
  <v-row>
    <v-col cols="1"></v-col>
    <v-col cols="4">
      <v-data-table
          :headers="headers"
          :items="tests"
          :items-per-page="50"
          class="elevation-1"
          @click:row="showTestInfo"
      ></v-data-table>
    </v-col>
    <v-col cols="5">
      <v-card>
        <v-card-text>
          <div v-if="Object.keys(testInfo).length === 0 && testInfo.constructor === Object">
            <p>Выберете тест</p>
          </div>
          <div v-else>
            <v-text-field :value="testInfo.id" disabled outlined label="Номер"/>
            <v-text-field :value="testInfo.title" disabled outlined label="Название"/>
            <v-text-field :value="testInfo.finishDate" v-model="testInfo.finishDate"
                          :disabled="editMode !== true" outlined label="Дедлайн"/>
            <v-text-field :value="testInfo.executionTime" v-model="testInfo.executionTime"
                          :disabled="editMode !== true" outlined label="Время на выполнение (мин.)"/>
            <v-text-field :value="testInfo.testType.title" disabled outlined label="Тип"/>
            <v-text-field :value="testInfo.questionCategory.title" disabled outlined title="test" label="Категория"/>
            <v-text-field :value="testInfo.code" disabled outlined label="Код"/>
            <div v-if="testInfo.testType.alias === 'generated'">
              <v-text-field :value="testInfo.questionsNumber" disabled outlined label="Количество вопросов (для генерации)"/>
            </div>
            <div v-else>
              <p>Вопросы:</p>
              <p v-for="question in testInfo.questions" :key="question.id">
                {{question.sortOrder + '. ' + question.description}}
              </p>
            </div>
          </div>
        </v-card-text>
        <v-card-actions v-if="testInfo.id">
          <v-spacer></v-spacer>
          <v-btn v-if="editMode" dark small color="green lighten-1" @click="updateTest">Сохранить</v-btn>
          <v-btn v-else dark small color="orange" @click="editMode = true">Редактировать</v-btn>
          <v-btn dark small color="red lighten-1">Удалить</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>
</template>

<script>
import {mapActions, mapGetters,} from "vuex";

export default {
  name: "TestsPage",

  data: () => ({
    editMode: false,
    testInfo: {},
    tests: [],
    headers: [{text: 'Выберете тест', align: 'center', sortable: false, value: 'testName'}]
  }),

  mounted() {
    this.fetchTestsByAuthor()
        .then(() => {
          this.prepareTestsForTable();
        });
  },

  methods: {
    ...mapActions(['fetchTestsByAuthor', 'putTest']),

    prepareTestsForTable()
    {
      this.getTests.forEach(test => {
        this.tests.push({id: test.id, testName: `Тест №${test.id}`})
      });
    },

    showTestInfo({id})
    {
      this.editMode = false;
      this.testInfo = this.getTests.get(id);
    },

    updateTest()
    {
      this.putTest(this.testInfo)
        .then((res) => {
          if (res) {
            this.testInfo = res;
          }
        });
      this.testInfo = {};
    }
  },

  computed: {
    ...mapGetters(['getTests']),
  },
}
</script>

<style scoped>

</style>