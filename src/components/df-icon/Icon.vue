<template>
   <fa-icon
      :icon="getIcon"
      :size="size"

      :beat="beat"
      :fade="fade"
      :spin="spin"
      :snake="snake"
      :bounce="bounce"

      :title="title"

      @click="$emit('click')" />
</template>

<script>
export default {
   name: "DfIcon",

   props: {
      icon: { type: String, required: true },
      size: { type: String, default: "xl" },
      beat: { type: Boolean },
      fade: { type: Boolean },
      spin: { type: Boolean },
      snake: { type: Boolean },
      bounce: { type: Boolean },
      title: { type: String }
   },

   computed: {
      getIcon() {
         return `fa-solid ${this.icon}`;
      }
   },
};
</script>