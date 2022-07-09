<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonLabel, IonItem, IonListHeader } from '@ionic/vue';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonLabel },
  setup() {
    const { t } = useI18n()

    return { t }
  },
  methods: {
    onChangeTheme(event: CustomEvent) {
      localStorage.setItem("color-scheme", event.detail.checked ? 'dark' : 'light');
      // ダークモードとライトモード切り替え
      document.body.classList.toggle('dark', event.detail.checked);
      document.body.classList.toggle('light', !event.detail.checked);
    },
  }
});
</script>

<template>
  <ion-list-header>{{ t("text.version.version") }}</ion-list-header>
  <ion-item>
    <ion-label slot="start">{{ t('text.version.app') }}</ion-label>
    <ion-label slot="end" class="version">{{}}</ion-label>
  </ion-item>
  <ion-item>
    <ion-label slot="start">{{ t('text.version.api') }}</ion-label>
    <ion-label slot="end" class="version">{{}}</ion-label>
  </ion-item>
</template>
