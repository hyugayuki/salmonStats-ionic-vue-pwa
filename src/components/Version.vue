<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonLabel, IonItem, IonListHeader } from '@ionic/vue';
import { useI18n } from "vue-i18n";

interface Version {
  version: string
  author: string
}

export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonLabel },
  setup() {
    const apiVersion: Ref<string> = ref("")
    const appiOSVersion: Ref<string> = ref("1.0.6")
    const appMdVersion: Ref<string> = ref("")
    const appVersion: string = process.env.VUE_APP_VERSION
    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/versions`;
    fetch(url).then(response => response.json()).then((response: Version) => {
      apiVersion.value = response.version
    });
    const { t, availableLocales, locale } = useI18n()

    return { t, appVersion, apiVersion }
  },
  methods: {
  }
});
</script>

<template>
  <ion-list-header>{{ t("text.version.version") }}</ion-list-header>
  <ion-item>
    <ion-label slot="start">{{ t('text.version.app') }}</ion-label>
    <ion-label slot="end" class="version">{{ appVersion }}</ion-label>
  </ion-item>
  <ion-item>
    <ion-label slot="start">{{ t('text.version.api') }}</ion-label>
    <ion-label slot="end" class="version">{{ apiVersion }}</ion-label>
  </ion-item>
</template>
