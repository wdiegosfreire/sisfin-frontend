<template>
   <v-expansion-panels :focusable="focusable">
      <v-expansion-panel @click="$emit('click')">
         <v-expansion-panel-header>Installments</v-expansion-panel-header>
         <v-expansion-panel-content>
            <v-simple-table :dense="dense">
               <thead>
                  <tr>
                     <th>#</th>
                     <th></th>
                     <th>SOURCE</th>
                     <th>DUE DATE</th>
                     <th>PAYMENT DATE</th>
                     <th>PAYMENT METHOD</th>
                     <th class="text-right">VALUE</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="objectiveMovement in collection" :key="objectiveMovement.identity">
                     <td class="sign-column">{{ objectiveMovement.installment }}</td>
                     <td class="sign-column"><df-icon v-if="objectiveMovement.currentInstallment" size="lg" icon="fa-check" color="green" title="Selected Installment" /></td>
                     <td>{{ objectiveMovement.accountSource.name }}</td>
                     <td>{{ objectiveMovement.dueDate | moment("DD/MM/YYYY") }}</td>
                     <td>{{ objectiveMovement.paymentDate | moment("DD/MM/YYYY") }}</td>
                     <td>{{ objectiveMovement.paymentMethod.name }}</td>
                     <td class="currency-column">{{ objectiveMovement.value }}</td>
                  </tr>
                  <tr>
                     <td colspan="6"></td>
                     <td class="currency-column">{{ movementTotalValue | currency }}</td>
                  </tr>
               </tbody>
            </v-simple-table>
         </v-expansion-panel-content>
      </v-expansion-panel>
   </v-expansion-panels>
</template>

<script lang="js">
import DfIcon from "../../components/df-icon/Icon.vue";

export default {
   name: "ObjectiveMovementResultObjectiveMovementList",

   components: { DfIcon },

   props: {
      collection: {
         type: Array,
         required: true
      },
      installment: {
         type: Number,
         required: false
      },
      focusable: {
         type: Boolean,
         default: false
      },
      dense: {
         type: Boolean,
         default: false
      }
   },

   data() {
      return {
         movementTotalValue: 0
      }
   },

   methods: {
      calculateTotalValueForEachItem() {
         this.movementTotalValue = 0;
         for (let objectiveMovement of this.collection) {
            this.movementTotalValue += objectiveMovement.value;
            objectiveMovement.currentInstallment = this.installment == objectiveMovement.installment;
         }
      }
   },

   beforeUpdate() {
      this.calculateTotalValueForEachItem();
   },

   beforeMount() {
      this.calculateTotalValueForEachItem();
   }
};
</script>

<style lang="css">
.currency-column {
	width: 100px;
   text-align: right;
}

.sign-column {
	width: 50px;
   text-align: right;
}
</style>