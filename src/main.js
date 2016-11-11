import Vue from 'vue'
import SlackComponent from './SlackComponent.vue'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<SlackComponent/>',
  components: { SlackComponent }
})
