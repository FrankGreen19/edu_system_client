<template>
  <v-row>
    <v-col cols="1"></v-col>
    <v-col cols="4">
      <v-data-table
          :headers="headers"
          :items="tests"
          :items-per-page="20"
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
          <div v-else style="color: black">
            <p>Тест № {{ testInfo.testId }}</p>
            <p>Категория: {{ testInfo.questionCategoryTitle }}</p>
            <p>Результат: {{ testInfo.result }}%</p>
            <AnswerItem v-for="answer in testInfo.questionAnswers" :answer="answer" :key="answer.questionAnswerId"/>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-col cols="1"></v-col>
  </v-row>
</template>

<script>
import AnswerItem from "@/components/AnswerItem";
import {mapActions, mapGetters} from "vuex";
export default {
  name: "PupilTestsPage",
  components: {AnswerItem},
  data: () => ({
    headers: [{text: 'Выберете тест', align: 'center', sortable: false, value: 'questionCategoryTitle'}],
    testInfo: {},
    tests: [],
  }),

  mounted() {
    this.fetchUsersTests().then(() => {
      this.tests = this.getUserTests;
    });
  },

  methods: {
    ...mapActions(['fetchUsersTests']),

    showTestInfo({id})
    {
      this.testInfo = this.tests.find((test) => {return test.id === id});
    },
  },

  computed: {
    ...mapGetters(['getUserTests']),
  }
}
</script>

<style scoped>

</style>