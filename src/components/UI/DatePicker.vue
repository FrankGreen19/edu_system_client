<template>
  <div>
    <p>{{ title }}</p>

    <v-dialog
        ref="dialog"
        v-model="modal"
        :return-value.sync="dontUnderstandThisValue"
        persistent
        width="290px"
    >
      <template v-slot:activator="{on,attrs}">
        <v-text-field
            :value="value"
            @input="$emit('input', $event.target.value)"
            prepend-icon="mdi-calendar"
            readonly
            solo
            v-bind="attrs"
            v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
          :value="value"
          @change="$emit('input', $event)"
          scrollable
          locale="ru"
          color="orange"
      >
        <v-spacer></v-spacer>
        <v-btn
            text
            color="primary"
            @click="modal = false"
        >
          Отмена
        </v-btn>
        <v-btn
            text
            color="primary"
            @click="$refs.dialog.save(value)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DatePicker",

  data: () => ({
    modal: false,
    dontUnderstandThisValue: ''
  }),

  props: {
    value: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
  },
}
</script>