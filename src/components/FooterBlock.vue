<template>
  <v-footer
        color="primary lighten-1"
        padless
        rounded
        absolute
    >
      <v-row
          justify="center"
          no-gutters
      >
        <v-btn
            v-for="link in links"
            :key="link.title"
            color="white"
            text
            rounded
            class="my-2"
            @click="$router.push(link.route)"
        >
          {{ link.title }}
        </v-btn>
        <v-col
            class="primary lighten-2 py-4 text-center white--text"
            cols="12"
        >
          {{ new Date().getFullYear() }} — <strong>Подвал сайтика с тестиками</strong>
        </v-col>
      </v-row>
    </v-footer>
</template>

<script>
export default {
  name: "FooterBlock",

  data: () => ({
    links: [
      {
        title: 'На главную',
        route: '/',
      },
      {
        title: 'Об авторе',
        route: '/'
      },
    ],
  }),
}
</script>

<style scoped>

</style>