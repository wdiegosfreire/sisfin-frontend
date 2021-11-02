<template>
   <v-container fluid>
      <back-button />
      <v-row v-if="book && book.volumeInfo">
         <v-col cols="12" md="3" v-if="book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.smallThumbnail" class="text-center">
            <img :src="book.volumeInfo.imageLinks.thumbnail" />
         </v-col>
         <v-col cols="12" md="9">
            <h6 class="display-1">{{ book.volumeInfo.title }}</h6>
            <h4 class="headline">{{ book.volumeInfo.subtitle || "Sem Descrição..." }}</h4>
            <p class="mt-2 text-justify" >{{ book.volumeInfo.description || "Sem Descrição..." }}</p>

            <div v-if="book.volumeInfo.authors && book.volumeInfo.authors.length">
               <v-subheader>Autores</v-subheader>
               <v-divider class="mb-4" />
               <v-chip v-for="(author, i) in book.volumeInfo.authors" :key="i" phill class="mr-3 mb-3">
                  <v-avatar left color="primary white-text">{{ author.substring(0, 1) }}</v-avatar>
                  {{ author }}
               </v-chip>
            </div>

            <div v-if="book.volumeInfo.categories && book.volumeInfo.categories.length">
               <v-subheader>Categorias</v-subheader>
               <v-divider class="mb-4" />
               <v-chip v-for="(category, i) in book.volumeInfo.categories" :key="i" class="mr-3">{{ category }}</v-chip>
            </div>

            <div v-if="book.volumeInfo.previewLink" class="mt-4">
               <v-subheader>Ações</v-subheader>
               <v-divider class="mb-4" />
               <v-btn text color="primary" @click="goToPreview(book)">Ver Preview</v-btn>
            </div>
         </v-col>
      </v-row>
   </v-container>
</template>

<script>
import api from "../api/api";
import bookService from "./bookService";
import BackButton from "../navigation/BackButton.vue";

export default {
   name: "BookEntryPage",
   components: { BackButton },
   mixins: [api, bookService],
   data() {
      return {
         book: {}
      }
   },
	created() {
		this.get(`/volumes/${this.$route.params.id}`).then(response => {
         this.book = response.data;
		});
   }
};
</script>

<style scoped>
</style>