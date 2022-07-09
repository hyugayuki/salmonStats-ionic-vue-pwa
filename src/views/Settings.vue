<script lang="ts">
import { defineComponent, ref, Ref } from 'vue';
import Version from '@/components/Version.vue';
import ServerInfo from '../components/ServerInfo.vue';

interface Result {
  version: string
}

interface Lookup {
  results: Result[]
}

interface HTMLElementEvent<T extends HTMLElement> extends Event {
  target: T;
}

export default defineComponent({
  name: 'SettingView',
  components: { Version, ServerInfo },
  setup() {
    return {}
  },
  methods: {
  }
});
</script>

<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Settings</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <Version />
        <ServerInfo />
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";

.version {
  font-size: 1.0rem !important;
}
</style>
