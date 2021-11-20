import transactionApiInstance from "./transactionApiInstance";

export default {
   name: "transactionApi",
   methods: {
      $_maintenance_get(url) {
         return transactionApiInstance.get(url);
      },
      $_maintenance_post(url, data) {
         return transactionApiInstance.post(url, data);
      },
      $_maintenance_put(url, data) {
         return transactionApiInstance.put(url, data);
      },
      $_maintenance_delete(url) {
         return transactionApiInstance.delete(url);
      }
   }
}