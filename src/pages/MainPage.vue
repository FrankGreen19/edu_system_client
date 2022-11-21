<template>
  <div class="pb-10">
    <v-btn v-if="isTeacher()" @click="$router.push('/new-test')">Создать тест</v-btn>
    <SendCodeComponent v-else/>
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