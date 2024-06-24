import transactionApi from "../../components/axios/transaction/transactionApi.js";

// Mixins
import format from "../../components/mixins/format.js";
import message from "../../components/mixins/message.js";

export default {
   name: "summaryService",

   mixins: [ transactionApi, message, format ],

   data() {
      return {
         showSearchField: false,
         barChartData: {},

         monthList: [
            {monthName: "January", monthNumber: "01"},
            {monthName: "February", monthNumber: "02"},
            {monthName: "March", monthNumber: "03"},
            {monthName: "April", monthNumber: "04"},
            {monthName: "May", monthNumber: "05"},
            {monthName: "June", monthNumber: "06"},
            {monthName: "July", monthNumber: "07"},
            {monthName: "August", monthNumber: "08"},
            {monthName: "September", monthNumber: "09"},
            {monthName: "October", monthNumber: "10"},
            {monthName: "November", monthNumber: "11"},
            {monthName: "December", monthNumber: "12"}
         ]
      };
   },

   methods: {
      async accessModule() {
         try {
            if (!this.$store.state.globalMonth || !this.$store.state.globalYear) {
               this.$_message_showError("Period not found");
               return;
            }
   
            let summary = {
               userIdentity: this.$store.state.userIdentity,
               periodDate: new Date(this.$store.state.globalYear + "-" + this.$store.state.globalMonth + "-01 12:00:00")
            };

            const response = await this.$_transaction_post("/summary/accessModule", summary);
            this.barChartData = response.data.map.barChartData;

            this.$_message_console(this.barChartData);
         }
         catch (error) {
            this.$_message_handleError(error);
         }
      }
   }
}
