import statementApiInstance from "./statementApiInstance";

export default {
   name: "statementApi",
   data() {
      return {
         tokenParam: "?token=" + this.$store.state.sessionToken
      }
   },
   methods: {
      $_statement_get(url) {
         return statementApiInstance.get(url + this.tokenParam);
      },
      $_statement_post(url, data, options) {
         return statementApiInstance.post(url + this.tokenParam, data, options);
      },
      $_statement_put(url, data) {
         return statementApiInstance.put(url + this.tokenParam, data);
      },
      $_statement_delete(url) {
         return statementApiInstance.delete(url + this.tokenParam);
      },

      async $_statement_post_sync(url, data) {
         try {
            return await statementApiInstance.post(url + this.tokenParam, data);
         } catch (error) {
            return error;
         }
      },
   }
}