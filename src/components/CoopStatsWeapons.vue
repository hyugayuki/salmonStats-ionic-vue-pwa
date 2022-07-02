<script lang="ts">
import { defineComponent } from 'vue';
import { IonList, IonItem, IonLabel, IonListHeader, IonImg, IonIcon } from '@ionic/vue';
import { useI18n } from 'vue-i18n'
import { WeaponResult } from './@types/response';
import { ribbonSharp } from 'ionicons/icons';

export default defineComponent({
  components: {
    IonLabel,
    IonItem,
    IonList,
    IonListHeader,
    IonImg,
    IonIcon
  },
  setup() {
    const { t } = useI18n()
    return { t, ribbonSharp };
  },
  mounted: function () {
    console.log("WeaponView Mounted")
  },
  created: function () {
    console.log("WeaponView Created")
  },
  props: {
    results: {
      type: Object as () => WeaponResult[],
      required: true,
      default: () => ({})
    }
  },
});
</script>

<template>
  <ion-list class="coop-result-list">
    <ion-list-header>{{ t("stats_type.GRADE") }}</ion-list-header>
    <ion-item v-for="result in results" :key="result.nsaid" class="coop-result">
      <ion-label>
        <section class="coop-ranking">
          <div class="coop-ranking-summary-rank">
            <ion-label>{{ result.rank }}</ion-label>
          </div>
          <div class="coop-ranking-summary-thumbnail">
            <ion-icon class="coop-player-verified" :icon="ribbonSharp">
            </ion-icon>
            <ion-img class="coop-player-thumbnail" :src="result.thumbnail_url"></ion-img>
          </div>
          <div class="coop-ranking-summary-player">
            <ion-label class="nsaid">{{ result.nsaid }}</ion-label>
            <ion-label>{{ result.name }}</ion-label>
          </div>
          <div class="coop-ranking-scores-list">
            <ul>
              <li class="coop-ranking-scores-list-item">
                <ion-label>{{ result.supplied_weapon_counts }}</ion-label>
              </li>
              <li class="coop-ranking-scores-list-item">
                <ion-label class="num">{{ result.shifts_worked }}</ion-label>
              </li>
            </ul>
          </div>
        </section>
      </ion-label>
    </ion-item>
  </ion-list>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
