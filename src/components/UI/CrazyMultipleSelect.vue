<template>
  <v-select
      :value="value"
      @change="$emit('input', $event)"
      :items="items"
      item-text="description"
      item-value="id"
      :label="label"
      :hint="label"
      multiple
      solo
      color="blue lighten-1"
  >
    <template v-slot:prepend-item>
      <v-list-item
          ripple
          @mousedown.prevent
          @click="toggle"
      >
        <v-list-item-action>
          <v-icon :color="value.length > 0 ? 'orange' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>
            Выбрать все
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>
    <template v-slot:append-item>
      <v-divider class="mb-2"></v-divider>
      <v-list-item disabled>
        <v-list-item-content v-if="needsSomeItem">
          <v-list-item-title>
            Выбрано опций
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ value.length }}
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
    },
    label: {
      type: String,
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