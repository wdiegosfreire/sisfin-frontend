<template>
   <v-expansion-panels :focusable="focusable" class="mb-1">
      <v-expansion-panel>
         <v-expansion-panel-header>Items</v-expansion-panel-header>
         <v-expansion-panel-content>
            <v-simple-table :dense="dense">
               <thead>
                  <tr>
                     <th>#</th>
                     <th>DESCRIPTION</th>
                     <th>TARGET</th>
                     <th class="text-right">AMOUNT</th>
                     <th></th>
                     <th class="text-right">VALUE</th>
                     <th></th>
                     <th class="text-right">TOTAL</th>
                  </tr>
               </thead>
               <tbody>
                  <tr v-for="objectiveItem in collection" :key="objectiveItem.identity">
                     <td>{{ objectiveItem.sequential }}</td>
                     <td>{{ objectiveItem.description }}</td>
                     <td>{{ objectiveItem.accountTarget | traceAccount }}</td>
                     <td class="currency-column">{{ objectiveItem.amount | currency(3) }}</td>
                     <td class="sign-column">x</td>
                     <td class="currency-column">{{ objectiveItem.unitaryValue | currency }}</td>
                     <td class="sign-column">=</td>
                     <td class="currency-column">{{ objectiveItem.totalValue | currency }}</td>
                  </tr>
                  <tr>
                     <td colspan="7"></td>
                     <td class="currency-column">{{ movementTotalValue | currency }}</td>
                  </tr>
               </tbody>
            </v-simple-table>
         </v-expansion-panel-content>
      </v-expansion-panel>
   </v-expansion-panels>
</template>

<script lang="js">
export default {
   name: "ObjectiveResultObjectiveItemList",

   props: {
      collection: {
         type: Array,
         required: true
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
         for (let objectiveItem of this.collection) {
            objectiveItem.totalValue = Number((objectiveItem.unitaryValue * objectiveItem.amount).toFixed(2));
            this.movementTotalValue += objectiveItem.totalValue;
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