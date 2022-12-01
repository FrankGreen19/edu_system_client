<template>
  <div>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="10">
        <v-card>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark small color="orange lighten-1" @click="$router.push('/new-category')">Создать новую категорию с вопросами</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
    <v-row>
      <v-col cols="1"></v-col>
      <v-col cols="4">
        <v-data-table
            :headers="headers"
            :items="getAuthoredQuestionCategories"
            :items-per-page="50"
            class="elevation-1"
            @click:row="showCategoryInfo"
        ></v-data-table>
      </v-col>
      <v-col cols="6">
        <v-card>
          <v-card-text>
            <div v-if="Object.keys(categoryInfo).length === 0 && categoryInfo.constructor === Object">
              <p>Выберете категорию</p>
            </div>
            <div v-else>
              <v-text-field :value="categoryInfo.id" disabled outlined label="Номер"/>
              <v-text-field :value="categoryInfo.title" disabled outlined label="Название"/>
              <div>
                <p class="text-h5">Вопросы:</p>
                <QuestionItem
                    v-for="question in categoryInfo.questions"
                    :key="question.id"
                    :question="question"
                    :editMode="editMode"
                />
              </div>
            </div>
          </v-card-text>
          <v-card-actions v-if="categoryInfo.id">
            <v-spacer></v-spacer>
            <v-btn v-show="editMode" dark small color="green lighten-1" @click="updateCategory">Сохранить</v-btn>
            <v-btn v-show="!editMode" dark small color="orange" @click="editMode = true">Редактировать</v-btn>
            <v-btn dark small color="red lighten-1">Удалить</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="1"></v-col>
    </v-row>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import QuestionItem from "@/components/QuestionItem";

export default {
  name: "CategoryPage",
  components: {QuestionItem},

  data: () => ({
    categoryInfo: {},
    headers: [{text: 'Выберете категорию', align: 'center', sortable: false, value: 'title'}],
    editMode: false,
  }),

  mounted() {
    this.fetchQuestionCategories();
  },

  methods: {
    ...mapActions(['fetchQuestionCategories']),

    showCategoryInfo({id})
    {
      this.categoryInfo = this.getAuthoredQuestionCategories
          .find((item) => {return item.id === id});
    },

    updateCategory()
    {
      this.editMode = false;
    },
  },

  computed: {
    ...mapGetters(['getAuthoredQuestionCategories']),
  }
}
</script>

<style scoped>

</style>