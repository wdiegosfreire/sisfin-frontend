<template>
   <fa-icon :icon="getIcon" :size="size" :spin="spin" />
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
         if (this.icon == "trash")
            return "fa-regular fa-trash-can";
         else if (this.icon == "edit")
            return "fa-regular fa-pen-to-square";
         else if (this.icon == "menu")
            return "fa-solid fa-bars";
         else if (this.icon == "plus")
            return "fa-solid fa-plus";
         else if (this.icon == "search")
            return "fa-solid fa-magnifying-glass";
         else if (this.icon == "reload")
            return "fa-solid fa-arrows-rotate";

         return "";
      }
   },
};
</script>