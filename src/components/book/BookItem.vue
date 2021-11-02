<template>
	<v-card class="mx-auto book-item">
      <div v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail" class="text-center pt-3">
         <img :src="book.volumeInfo.imageLinks.smallThumbnail" />
      </div>
      
		<v-card-title>
         <span>{{ book.volumeInfo.title.substring(0, maxTitleLength) }}</span>
         <span v-if="book.volumeInfo.title.length > maxTitleLength">...</span>
      </v-card-title>
		<v-card-text>{{ book.volumeInfo.subtitle || "Sem descrição..." }}</v-card-text>

		<v-card-actions>
         <forward-navigation-button :url="entryPageUrl" />
         <v-btn text small color="primary" @click="goToPreview(book)" v-if="book.volumeInfo.previewLink">
            Ver Preview
         </v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import bookService from "./bookService";
import ForwardNavigationButton from "../navigation/ForwardNavigationButton.vue";

export default {
   name: "BookItem",
   components: { ForwardNavigationButton },
   mixins: [bookService],
   props: {
      book: {
         type: Object,
         required: true
      }
   },
   data() {
      return {
         maxTitleLength: 25
      }
   },
   computed: {
      entryPageUrl() {
         return `/book/${this.book.id}`;
      }
   }
};
</script>

<style scoped>
   .book-item {
      height: 100%;
   }
</style>