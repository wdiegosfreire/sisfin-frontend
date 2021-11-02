export default {
   name: "message",
   methods: {
      $_message_showInfo(message) {
         this.$store.commit("showMessage", { severity: "info", summary: "Informação", detail: [message] });
      },
      $_message_showError(message) {
         this.$store.commit("showMessage", { severity: "error", summary: "Erro", detail: [message] });
      },
      $_message_showWarning(message) {
         this.$store.commit("showMessage", { severity: "warning", summary: "Alerta", detail: [message] });
      },
      $_message_showRequired(message) {
         this.$store.commit("showMessage", { severity: "warning", summary: "Campo Obrigatório", detail: [message] });
      },
      $_message_showSuccess() {
         this.$store.commit("showMessage", { severity: "success", summary: "Sucesso", detail: ["Operação executada com sucesso."] });
      },
      $_message_showMessage(severity, summary, messageList) {
         this.$store.commit("showMessage", { severity: severity, summary: summary, detail: messageList });
      },
		$_message_handleError(error) {
			let exception = error.response.data;
         this.$_message_showMessage(exception.severity, exception.summary, exception.messageList);
		}
   }
}