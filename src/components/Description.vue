<script lang="ts"></script>

<template>
  <ion-list-header>{{ t("text.uploader") }}</ion-list-header>
  <ion-item>
    <p class="description">In order to upload results to Salmon Stats, you will need to use the following app,
      which is compatible with both iPhone and Android.
    </p>
  </ion-item>
  <ion-item button>
    <ion-avatar slot="start">
      <img
        src="https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/82/91/9b/82919b7d-2047-432c-4e87-313111198045/AppIcon-0-1x_U007emarketing-0-10-0-85-220.png/434x0w.webp" />
    </ion-avatar>
    <ion-label slot="start" color="danger"><a href="itms-beta://testflight.apple.com/join/dVMPIN8o">Salmonia3/iOS</a>
    </ion-label>
    <ion-label slot="end" class="version">{{ appiOSVersion }}</ion-label>
  </ion-item>
  <ion-item button>
    <ion-avatar slot="start">
      <img
        src="https://is5-ssl.mzstatic.com/image/thumb/Purple116/v4/82/91/9b/82919b7d-2047-432c-4e87-313111198045/AppIcon-0-1x_U007emarketing-0-10-0-85-220.png/434x0w.webp" />
    </ion-avatar>
    <ion-label slot="start" color="danger"><a
        href="https://github.com/SalmonStats/sinclair/releases">Sinclair/Android</a></ion-label>
    <ion-label slot="end" class="version">0.0.4</ion-label>
  </ion-item>
  <ion-item>
    <p class="description">Salmon Stats is an open-source Splatoon 2 Salmon Run statistics website developed by
      <a href="https://twitter.com/tkgling">@tkgling</a>. All of
      source code including Website, server, client are fully public on <a
        href="https://github.com/SalmonStats">GitHub</a>. Moreover, the documents of API is
      published in <a href="https://salmonstats.github.io/api">GitHub pages</a>, you could build own
      applications, website, tool as long as they are based on <a href="https://choosealicense.com/licenses/mit">MIT
        License</a>.
    </p>
  </ion-item>
</template>
