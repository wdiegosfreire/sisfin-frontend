<template>
   <fa-icon :icon="getIcon" :size="size" :spin="spin" @click="$emit('click')" />
</template>

<script>
export default {
   name: "DfIcon",

   props: {
      icon: {
         type: String,
         required: true
      },
      size: {
         type: String,
         default: "xl"
      },
      spin: {
         type: Boolean
      }
   },

   computed: {
      getIcon() {
         return "fa-solid " + this.icon;
      }
   },
};
</script>