<template>
  <div>
    <p>{{ title }}</p>
    <v-radio-group
        v-model="model"
        light
        row
    >
      <v-radio
          v-for="item in items"
          v-bind:key="item.id"
          color="blue"
          :label="item.title"
          :value="item.id"
      ></v-radio>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: "RadioGroup",

  created() {
    this.model = this.value;
  },

  data: () => ({
    model: null,
  }),

  props: {
    items: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    value: {
      type: Number,
      required: true
    },
  },

  watch: {
    model(value) {
      this.$emit('input', value);
    }
  }
}
</script>

<style scoped>

</style>