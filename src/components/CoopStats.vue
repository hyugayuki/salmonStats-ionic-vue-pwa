<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonRefresher, IonContent, IonRefresherContent, IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue';
import { useI18n } from 'vue-i18n';
import CoopStatsGlobal from './CoopStatsGlobal.vue';
import CoopStatsBossType from './CoopStatsBossType.vue';
import CoopStatsWave from './CoopStatsWave.vue';
import CoopStatsWeapons from './CoopStatsWeapons.vue';
import CoopStatsGrade from './CoopStatsGrade.vue';
import { LegacyStats } from './@types/response';
import { useRoute } from 'vue-router';

enum StatsType {
  GLOBAL = "GLOBAL",
  SALMONID = 'SALMONID',
  WEAPONS = 'WEAPONS',
  GRADE = 'GRADE',
  EGGS = 'EGGS'
}

export default defineComponent({
  components: {
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonLabel,
    IonSegment,
    IonSegmentButton,
    CoopStatsGlobal,
    CoopStatsBossType,
    CoopStatsGrade,
    CoopStatsWave,
    CoopStatsWeapons
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const { start_time } = route.params
    const statsType: Ref<StatsType> = ref(StatsType.GLOBAL)
    const results: Ref<LegacyStats | undefined> = ref<LegacyStats>()

    return { statsType, StatsType, results, start_time, t };
  },
  mounted() {
    this.onLoad()
  },
  methods: {
    onLoad(): void {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/stats/${this.start_time}`;
      const headers = {
        "cache-control": "force-cache; max-age=3600",
      }
      fetch(url, { headers: headers }).then(response => response.json()).then((response: LegacyStats) => {
        this.results = response;
      });
    },
    onRefresh(event: CustomEvent): void {
      setTimeout(() => {
        this.onLoad()
        event.detail.complete();
      }, 1500);
    },
    onStatsTypeChanged(event: CustomEvent): void {
      this.statsType = event.detail.value
    },
  },
});
</script>

<template>
  <ion-content fullscreen>
    <ion-refresher slot="fixed" pull-factor="0.5" @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-segment mode="md" @ionChange="onStatsTypeChanged($event)" :value="statsType" scrollable>
      <template v-for="statsType in Object.values(StatsType)" :key="statsType">
        <ion-segment-button :value="statsType">
          <ion-label>{{ t(`stats_type.${statsType}`) }}</ion-label>
        </ion-segment-button>
      </template>
    </ion-segment>
    <CoopStatsGlobal :results="results?.job_results" v-if="statsType == StatsType.GLOBAL" />
    <CoopStatsBossType :results="results?.boss_results" v-if="statsType == StatsType.SALMONID" />
    <CoopStatsGrade :results="results?.grade_results" v-if="statsType == StatsType.GRADE" />
    <CoopStatsWeapons :results="results?.weapon_results" v-if="statsType == StatsType.WEAPONS" />
    <CoopStatsWave :results="results?.wave_results" v-if="statsType == StatsType.EGGS" />
  </ion-content>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
