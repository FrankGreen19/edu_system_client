<template>
  <div>
    <p>{{ title }}</p>
    <v-radio-group
        :value="value"
        @change="$emit('input', $event)"
        light
        row
    >
      <v-radio
          v-for="item in items"
          :key="item.id"
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
}
</script>

<style scoped>

</style>