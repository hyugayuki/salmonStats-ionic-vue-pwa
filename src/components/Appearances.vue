<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonLabel, IonItem, IonSelect, IonToggle, IonListHeader } from '@ionic/vue';
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonToggle, IonLabel, IonSelect },
  setup() {
    const { t, locale } = useI18n()

    const toggleValue: boolean = (() => {
      console.log("Local", localStorage.getItem("color-scheme"))
      // ローカルに保存されていなければ現在のデバイスの設定を取得
      const colorScheme: string = localStorage.getItem("color-scheme") ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      console.log(colorScheme)
      return colorScheme === 'dark'
    })()

    return { t, toggleValue }
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
</script></script>

<template>
  <ion-list-header>{{ t("text.appearances") }}</ion-list-header>
  <ion-item>
    <ion-label slot="start">{{ t("appearances.darkMode") }}</ion-label>
    <ion-toggle slot="end" v-on:ion-change="onChangeTheme($event)" :checked="toggleValue">{{ t('text.version.app')
    }}</ion-toggle>
  </ion-item>
  <ion-item>
    <ion-label slot="start">{{ t('languages.lang') }}</ion-label>
    <ion-select slot="end" interface="action-sheet" :placeholder="t(`languages.${lang}`)" mode="ios"
      :cancel-text="t('text.cancel')" v-on:ion-change="onChange($event)">
      <template v-for="locale in availableLocales" :key="locale">
        <ion-select-option :value="locale">{{ t(`languages.${locale}`) }}</ion-select-option>
      </template>
    </ion-select>
  </ion-item>
</template>
