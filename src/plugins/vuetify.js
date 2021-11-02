import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
   theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#21CFF3',
          secondary: '#ffe18d',
          accent: '#FF4081',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252'
        },
        light: {
          primary: '#2196F3',
          secondary: '#BBDEFB',
          accent: '#E91E63',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252'
        }
      },
    },
});
