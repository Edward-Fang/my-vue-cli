import Vue from "vue";
import App from "./App.vue";
import { add } from "./tools/add";
import { divide } from "./tools/divide";

console.log(add(1, 2));
console.log(divide(1, 2));

new Vue({
  render: (h) => h(App),
}).$mount("#app");
