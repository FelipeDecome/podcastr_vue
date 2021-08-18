import format from "date-fns/format";
import ptBr from "date-fns/locale/pt-BR";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store, storeKey } from "./store";
import { convertDurationToTimeString } from "./utils/convertDurationToTimeString";

const app = createApp(App);

app.config.globalProperties.$filters = {
  formatHeaderDate(date: number) {
    return format(date, "EEEEEE, i MMMM", { locale: ptBr });
  },
  formatEpisodeDate(date: number) {
    return format(date, "d MMM yy", { locale: ptBr });
  },
  formatEpisodeDuration(duration: number): string {
    return convertDurationToTimeString(duration);
  },
};

app.use(store, storeKey).use(router).mount("#app");
