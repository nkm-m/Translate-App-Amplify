import Vue from "vue";
import App from "./App.vue";
import Amplify, { API } from "aws-amplify";
import awsconfig from "./aws-exports";
Amplify.configure(awsconfig);
//API GatewayのAPI名
Vue.prototype.$apiName = "your-api-name";
Vue.prototype.$api = API;
Vue.config.productionTip = false;
new Vue({
  render: (h) => h(App),
}).$mount("#app");
