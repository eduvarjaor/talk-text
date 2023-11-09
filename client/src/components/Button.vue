<template>
  <button
    @click="onClick"
    :disabled="disabled"
    :class="`p-3 text-lg rounded-lg transition ease-in duration-200 font-semibold w-24  shadow-xl`"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    color: {
      type: String,
      default: 'blue',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>
