<template>
  <v-select
      :value="value"
      @change="$emit('input', $event)"
      :items="items"
      item-text="description"
      item-value="id"
      label="Favorite Fruits"
      multiple
  >
    <template v-slot:prepend-item>
      <v-list-item
          ripple
          @mousedown.prevent
          @click="toggle"
      >
        <v-list-item-action>
          <v-icon :color="value.length > 0 ? 'indigo darken-4' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Select All
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider class="mt-2"></v-divider>
    </template>
    <template v-slot:append-item>
      <v-divider class="mb-2"></v-divider>
      <v-list-item disabled>
        <v-list-item-avatar color="grey lighten-3">
          <v-icon>
            mdi-food-apple
          </v-icon>
        </v-list-item-avatar>

        <v-list-item-content v-if="needsAllItems">
          <v-list-item-title>
            Holy smokes, someone call the fruit police!
          </v-list-item-title>
        </v-list-item-content>

        <v-list-item-content v-else-if="needsSomeItem">
          <v-list-item-title>
            Fruit Count
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ value.length }}
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-content v-else>
          <v-list-item-title>
            How could you not like fruit?
          </v-list-item-title>
          <v-list-item-subtitle>
            Go ahead, make a selection above!
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-select>
</template>

<script>
export default {
  name: "CrazyMultipleSelect",

  props: {
    value: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  },

  computed: {
    needsAllItems () {
      return this.value.length === this.items.length
    },
    needsSomeItem () {
      return this.value.length > 0 && !this.needsAllItems
    },
    icon () {
      if (this.needsAllItems) return 'mdi-close-box'
      if (this.needsSomeItem) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },

  methods: {
    toggle () {
      this.$nextTick(() => {
        if (this.needsAllItems) {
          this.$emit('input', []);
        } else {
          this.$emit('input', this.items.slice());
        }
      })
    },
  },
}
</script>

<style scoped>

</style>