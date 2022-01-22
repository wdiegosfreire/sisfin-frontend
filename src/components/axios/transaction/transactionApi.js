import transactionApiInstance from "./transactionApiInstance";

export default {
   name: "transactionApi",
   methods: {
      $_transaction_get(url) {
         return transactionApiInstance.get(url);
      },
      $_transaction_post(url, data) {
         return transactionApiInstance.post(url, data);
      },
      $_transaction_put(url, data) {
         return transactionApiInstance.put(url, data);
      },
      $_transaction_delete(url) {
         return transactionApiInstance.delete(url);
      }
   }
}