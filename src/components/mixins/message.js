export default {
   name: "message",
   methods: {
      $_message_showInfo(message) {
         this.$store.commit("showMessage", { severity: "info", summary: "Information", detail: [message] });
      },

      $_message_showError(message) {
         this.$store.commit("showMessage", { severity: "error", summary: "Error", detail: [message] });
      },

      $_message_showWarning(message) {
         this.$store.commit("showMessage", { severity: "warning", summary: "Warning", detail: [message] });
      },

      $_message_showRequired(message) {
         this.$store.commit("showMessage", { severity: "warning", summary: "Required Field", detail: [message] });
      },

      $_message_showSuccess() {
         this.$store.commit("showMessage", { severity: "success", summary: "Success", detail: ["Operation performed successfully."] });
      },

      $_message_showMessage(severity, summary, messageList) {
         this.$store.commit("showMessage", { severity: severity, summary: summary, detail: messageList });
      },

		$_message_handleError(error) {
         if (!error) {
            return;
         }

         let exception = null;
         if (!error.response && error.message == "Network Error") {
            exception = {
               severity: "error",
               summary: error.message,
               messageList: ["Unable to connect with server."]
            };
         }
         else {
            exception = JSON.parse(error.response.data.message);
         }

         this.$_message_showMessage(exception.severity, exception.summary, exception.messageList);
		},

      $_message_console(message) {
         /* eslint no-console: "off" */
         console.log(JSON.stringify(message));
		},

      $_message_alert(message) {
         /* eslint no-alert: "off" */
         alert(`App Alert: ${JSON.stringify(message)}`);
		}
   }
}