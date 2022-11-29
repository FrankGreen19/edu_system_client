<template>
  <div class="pb-10">
    <div v-if="isTeacher()">
      <v-btn class="mt-3" dark color="orange lighten-1" @click="$router.push('/categories')">Категории</v-btn>
      <br>
      <v-btn class="mt-3" dark color="orange lighten-1" @click="$router.push('/new-test')">Создать тест</v-btn>
    </div>
    <div v-else>
      <SendCodeComponent />
      <v-btn class="mt-3" dark color="orange lighten-1" @click="$router.push('/passed-tests')">Пройденные тесты</v-btn>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import SendCodeComponent from "@/components/SendCodeComponent";

export default {
  name: "MainPage",
  components: {SendCodeComponent},

  methods: {
    isTeacher()
    {
      return this.getUser.roles.find((role) => role === 'ROLE_TEACHER');
    }
  },

  computed: {
    ...mapGetters(['getUser']),
  }
}
</script>

<style scoped>

</style>