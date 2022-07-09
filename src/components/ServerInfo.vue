<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import { IonLabel, IonItem, IonListHeader } from '@ionic/vue';
import { useI18n } from "vue-i18n";

interface SystemInfo {
  os: {
    dist: string,
    distversion: string
  }
  kernel: string
  arch: string
  client: string
  cpu: {
    cores: number,
    type: string
  }
}

interface SystemStatus {
  version: string
  data: {
    sys_info: SystemInfo
  }
}

export default defineComponent({
  name: 'SettingView',
  components: { IonListHeader, IonItem, IonLabel },
  setup() {
    const { t } = useI18n()
    const sys_info: Ref<SystemInfo | undefined> = ref<SystemInfo>();
    return { t, sys_info };
  },
  mounted() {
    this.onRoad()
  },
  methods: {
    onRoad() {
      const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/system`;
      fetch(url).then(response => response.json()).then((response: SystemStatus) => {
        this.sys_info = response.data.sys_info;
      });
    }
  }
});
</script>

<template>
  <ion-list-header>{{ t("system.server") }}</ion-list-header>
  <ion-item>
    <ion-label slot="start">{{ t("server.system.os") }}</ion-label>
    <ion-label slot="end" class="version">{{ sys_info?.os.dist }} {{ sys_info?.os.distversion }}</ion-label>
  </ion-item>
  <ion-item>
    <ion-label slot="start">{{ t("server.system.os") }}</ion-label>
    <ion-label slot="end" class="version">{{ sys_info?.kernel }} </ion-label>
  </ion-item>
  <ion-item>
    <ion-label slot="start">{{ t("server.system.os") }}</ion-label>
    <ion-label slot="end" class="version">{{ sys_info?.cpu.type }}</ion-label>
  </ion-item>
</template>
