<template>
  <div class="">
    <v-container>
      <v-row>
        <v-col class="mx-auto" cols="4">
          <v-card class="text-center">
            <v-card-title >Аутентификация</v-card-title>
            <v-card-text>
              <v-text-field
                  solo
                  label="Адрес электронной почты"
                  class="mt-3"
                  :rules="[]"
                  v-model="email"/>
              <v-text-field
                  solo
                  label="Пароль"
                  :type="'password'"
                  v-model="password"/>
              <v-btn @click="onSubmit"
                     class="my-2"
                     dark
                     rounded
                     color="orange">
                Войти
              </v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "LoginPage",

  data: () => ({
    email: '',
    password: '',
  }),

  methods: {
    ...mapActions(['login', 'fetchUser']),

    onSubmit()
    {
      this.login({
        email: this.email,
        password: this.password
      }).then(() => {
        this.fetchUser()
            .then(() => {
              this.$router.push('/').catch(() => {});
            });
      })
    }
  }
}
</script>
