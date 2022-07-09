<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { Result } from './@types/response';

export default defineComponent({
  components: {
    IonItem,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonLabel,
  },
  setup() {
    const { t } = useI18n()
    const results: Ref<Result[]> = ref<Result[]>([]);
    return { results, t };
  },
  mounted: function () {
    this.onReload();
  },
  methods: {
    async onReload() {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/results`;
      fetch(url).then(response => response.json()).then(response => {
        this.results = response.results;
        console.log(this.results)
      });
    },
    onRefresh(event: CustomEvent) {
      this.onReload().then(() => event.detail.complete());
    },
    getWaterLevel(water_level: number): string {
      switch (water_level) {
        case 0:
          return this.t("water_level.LT")
        case 1:
          return this.t("water_level.NT")
        case 2:
          return this.t("water_level.HT")
        default:
          return "NT"
      }
    },
    getEventType(event_type: number): string {
      switch (event_type) {
        case 0:
          return this.t("event_type.WATER_LEVELS")
        case 1:
          return this.t("event_type.RUSH")
        case 2:
          return this.t("event_type.GEYSER")
        case 3:
          return this.t("event_type.GRILLER")
        case 4:
          return this.t("event_type.RALLY")
        case 5:
          return this.t("event_type.FOG")
        case 6:
          return this.t("event_type.MISSILE")
        default:
          return "-"
      }
    }
  },
});
</script>

<template>
  <ion-content fullscreen="true">
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-list class="coop-result-list">
      <ion-item v-for="result in results" :key="result.salmon_id" class="coop-result">
        <ion-label>
          <section class="coop-result-summary">
            <div class="coop-result-job-result">
              <ion-label class="salmon_id">{{ result.salmon_id }}</ion-label>
              <ion-label :class="result.job_result.is_clear ? 'job_clear' : 'job_failure'">{{ result.job_result.is_clear
                  ?
                  "Clear" : "Failure"
              }}</ion-label>
              <ion-label class="danger_rate">{{ result.danger_rate.toFixed(1) }}</ion-label>
            </div>
            <div class="coop-result-job-waves">
              <div class="coop-result-job-waves-golden-ikura">
                <template v-for="wave in result.waves" :key="wave">
                  <ion-label>{{
                      ("00" + wave.golden_ikura_num).slice(-2)
                  }}/{{ wave.quota_num }}</ion-label>
                </template>
              </div>
              <div class="coop-result-job-waves-information">
                <template v-for="wave in result.waves" :key="wave">
                  <ion-label class="wave-information">{{ getWaterLevel(wave.water_level) }} {{
                      getEventType(wave.event_type)
                  }}</ion-label>
                </template>
              </div>
            </div>
            <div class="coop-result-job-detail">
              <ion-label class="num golden_ikura_num">{{ result.golden_ikura_num }}</ion-label>
              <ion-label class="num ikura_num">{{ result.ikura_num }}</ion-label>
            </div>
          </section>
        </ion-label>
        <!-- <ion-label>{{ result.salmon_id }}</ion-label> -->
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<style lang="scss">
@import "../theme/styles.scss";
</style>
