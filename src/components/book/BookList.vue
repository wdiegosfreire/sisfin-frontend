<template>
    <div>
        <v-row>
            <v-col cols="12">
                <search-input-field @search="doSearch" />
            </v-col>
        </v-row>

        <v-row justify="center" v-if="!bookList.length">
            <v-col cols="12" md="4" class="text-center">
                <p class="overline">Digite algo para iniciar a pesquisa, ou pesquise alguma outra coisa...</p>
            </v-col>
        </v-row>

        <loading :condition="searchOnGoing">
            <v-row>
                <v-col v-for="(book, i) in bookList" :key="i " cols="12" md="3">
                    <book-item :book="book" />
                </v-col>
            </v-row>
        </loading>
    </div>
</template>

<script>
import api from "../api/api";

import Loading from "../loading/Loading.vue";
import BookItem from "../book/BookItem.vue";
import SearchInputField from "../search/SearchInputField.vue";

export default {
    name: "BookList",
    components: {
        Loading, 
        BookItem,
        SearchInputField
    },
    mixins: [api],
    data() {
        return {
            searchOnGoing: false,
            bookList: []
        }
    },
    methods: {
        doSearch(textSearch) {
            if (textSearch) {
                this.searchOnGoing = true;

                this.get(`/volumes?q=${textSearch}`).then((response) => {
                    this.bookList = response.data.items;
                    this.searchOnGoing = false;
                }).catch(() => {
                    this.searchOnGoing = false;
                });
            }
            else {
                this.bookList = [];
            }
        }
    }
};
</script>

<style scoped>
</style>