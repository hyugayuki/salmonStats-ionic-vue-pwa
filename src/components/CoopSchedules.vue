<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import { IonButton, IonList, IonItem, IonRefresher, IonContent, IonRefresherContent, IonLabel, IonImg, useIonRouter } from '@ionic/vue';
import dayjs from 'dayjs';
import { createAnimation } from '@ionic/vue';
import { useI18n } from 'vue-i18n';

interface Schedules {
  limit: number
  offset: number
  results: Schedule[]
}

interface Schedule {
  start_time: string
  stage_id: number
  end_time: string
  rare_weapon?: number
  weapon_list: number[]
}

const StageType: { [name: number]: string } = {
  5000: "https://app.splatoon2.nintendo.net/images/coop_stage/65c68c6f0641cc5654434b78a6f10b0ad32ccdee.png",
  5001: "https://app.splatoon2.nintendo.net/images/coop_stage/e07d73b7d9f0c64e552b34a2e6c29b8564c63388.png",
  5002: "https://app.splatoon2.nintendo.net/images/coop_stage/6d68f5baa75f3a94e5e9bfb89b82e7377e3ecd2c.png",
  5003: "https://app.splatoon2.nintendo.net/images/coop_stage/e9f7c7b35e6d46778cd3cbc0d89bd7e1bc3be493.png",
  5004: "https://app.splatoon2.nintendo.net/images/coop_stage/50064ec6e97aac91e70df5fc2cfecf61ad8615fd.png",
};

const WeaponType: { [name: string]: string } = {
  "-2": "https://app.splatoon2.nintendo.net/images/coop_weapons/7076c8181ab5c49d2ac91e43a2d945a46a99c17d.png",
  "-1": "https://app.splatoon2.nintendo.net/images/coop_weapons/746f7e90bc151334f0bf0d2a1f0987e311b03736.png",
  "0": "https://app.splatoon2.nintendo.net/images/weapon/32d41a5d14de756c3e5a1ee97a9bd8fcb9e69bf5.png",
  "10": "https://app.splatoon2.nintendo.net/images/weapon/91b6666bcbfccc204d86f21222a8db22a27d08d0.png",
  "20": "https://app.splatoon2.nintendo.net/images/weapon/e5a97d52f12a83a037526588363021f2c1f718b0.png",
  "30": "https://app.splatoon2.nintendo.net/images/weapon/c6ab7ebff7af7f7604eb53a12851da880b1ec2c7.png",
  "40": "https://app.splatoon2.nintendo.net/images/weapon/e1d09fc9502a81c82137c8dcd5a872eb872af697.png",
  "50": "https://app.splatoon2.nintendo.net/images/weapon/df04ddaf086cea94491df553a6d2550230a4da3c.png",
  "60": "https://app.splatoon2.nintendo.net/images/weapon/1f2b1db5917ef7a4e62f0e15b8805275e33f2179.png",
  "70": "https://app.splatoon2.nintendo.net/images/weapon/2e2b59379b8f14cfed0600f84590be0ecad707b6.png",
  "80": "https://app.splatoon2.nintendo.net/images/weapon/df90f6065594378690647c23d42440e2de89c99d.png",
  "90": "https://app.splatoon2.nintendo.net/images/weapon/007fb7ed50e76dde495ffb0747421b50dfce8aa3.png",
  "200": "https://app.splatoon2.nintendo.net/images/weapon/3f840ce3cc5ac0b8cbf7451079b57e807d8b95f1.png",
  "210": "https://app.splatoon2.nintendo.net/images/weapon/cfafc8bc42bcd89058fdb22b7b943fb9f893adb8.png",
  "220": "https://app.splatoon2.nintendo.net/images/weapon/109b2b851481510eaacb50afc8ce9fb79b7f20ad.png",
  "230": "https://app.splatoon2.nintendo.net/images/weapon/2b684d81508ca5286060767e29dd81ca38303f43.png",
  "240": "https://app.splatoon2.nintendo.net/images/weapon/72bdcf5f6077bd7149832153034b3f43d16ac461.png",
  "250": "https://app.splatoon2.nintendo.net/images/weapon/8f64580bb033ba86fa0179179cfeb56b5544fda6.png",
  "300": "https://app.splatoon2.nintendo.net/images/weapon/202724be5bb5e59457227d087d7c48a32c01db24.png",
  "310": "https://app.splatoon2.nintendo.net/images/weapon/45e8847cbaf09bdc86c6e6627236286781b09f0f.png",
  "400": "https://app.splatoon2.nintendo.net/images/weapon/b9901d49ef3229d3e62d58fc3e1edc8c48da6873.png",
  "1000": "https://app.splatoon2.nintendo.net/images/weapon/123db7c37066e10e2c437656db2a26f18898e6b6.png",
  "1010": "https://app.splatoon2.nintendo.net/images/weapon/1041dbdd11b3036671148d47c2e0798cecf3dba2.png",
  "1020": "https://app.splatoon2.nintendo.net/images/weapon/3d274190988ad20dd1b02825448edbb6e12c720c.png",
  "1030": "https://app.splatoon2.nintendo.net/images/weapon/e32ed68bb18628c5ede5816a2fbc2b8fcdd04124.png",
  "1100": "https://app.splatoon2.nintendo.net/images/weapon/1f94c29067c918ac9143b756dc607ff0f8cf4e63.png",
  "1110": "https://app.splatoon2.nintendo.net/images/weapon/f1d5740dfb7d87f7e43974bbe5585445368741b8.png",
  "2000": "https://app.splatoon2.nintendo.net/images/weapon/5a0a20324f1374a363363d721a605849e36ffff2.png",
  "2010": "https://app.splatoon2.nintendo.net/images/weapon/1ed94885bef2b0e498ed4dd76bea9064c85cfc94.png",
  "2020": "https://app.splatoon2.nintendo.net/images/weapon/0ec07bb00918f071975b35191e0860152bdcb321.png",
  "2030": "https://app.splatoon2.nintendo.net/images/weapon/a6279990ad871fccdd9f2a64a2951f8726f45c48.png",
  "2040": "https://app.splatoon2.nintendo.net/images/weapon/fd4b89e84b375f01290185f2236dbee935dd1682.png",
  "2050": "https://app.splatoon2.nintendo.net/images/weapon/6ecbbb897d6c59a5c03097216ef4f803366ea6fa.png",
  "2060": "https://app.splatoon2.nintendo.net/images/weapon/26d523e6eee3d57dc6c5f531dfc1747ffd46b8b8.png",
  "3000": "https://app.splatoon2.nintendo.net/images/weapon/3963a3fb1ff8038a42072e913587fc6f9aa00d71.png",
  "3010": "https://app.splatoon2.nintendo.net/images/weapon/ad921a57ab1b7721c50873c082bb34591b61021c.png",
  "3020": "https://app.splatoon2.nintendo.net/images/weapon/27a026e7dec5a068777bb7883f50451aec799d71.png",
  "3030": "https://app.splatoon2.nintendo.net/images/weapon/2835f6d61a4296b4ac3876337884a0c453a4fa4f.png",
  "3040": "https://app.splatoon2.nintendo.net/images/weapon/6f1c2a339db6ec0dccb65704adee2db93c768245.png",
  "4000": "https://app.splatoon2.nintendo.net/images/weapon/2a1c5ca0e68919b4d655bd860cac3b2942b95498.png",
  "4010": "https://app.splatoon2.nintendo.net/images/weapon/6f42c9f8fde07510a01072a669125545f6effb99.png",
  "4020": "https://app.splatoon2.nintendo.net/images/weapon/e34bbd580e49695b97d5fc4464cc901d4fe08ce5.png",
  "4030": "https://app.splatoon2.nintendo.net/images/weapon/f208b6222acb5014ab96285e9b9a3e98039c884b.png",
  "4040": "https://app.splatoon2.nintendo.net/images/weapon/d79b99092aa03dc249b1f767197c1ecbda9d3cd7.png",
  "5000": "https://app.splatoon2.nintendo.net/images/weapon/cc4bc30ff53bf2b45bd5e3dadceb39d52b95761f.png",
  "5010": "https://app.splatoon2.nintendo.net/images/weapon/bb5caf24e43f8c7ceb126670bf24fd3aa9a3c3fc.png",
  "5020": "https://app.splatoon2.nintendo.net/images/weapon/7d6032f0ceee14c4607385b848c6e486b84a2865.png",
  "5030": "https://app.splatoon2.nintendo.net/images/weapon/aaead5ff0b63cdcb989b211d649b2552bb3e3a1b.png",
  "5040": "https://app.splatoon2.nintendo.net/images/weapon/ba750d284eb067abdc995435c3358eed4e6f90fa.png",
  "6000": "https://app.splatoon2.nintendo.net/images/weapon/f1fa6db2e21f32cd1c2cd093ec24f1a450d4650c.png",
  "6010": "https://app.splatoon2.nintendo.net/images/weapon/cdb032aa993f4836580ce4edac06de0138833299.png",
  "6020": "https://app.splatoon2.nintendo.net/images/weapon/15fe3fe6bbec24ddb5fdc3ffd06585bc82440531.png",
  "20000": "https://app.splatoon2.nintendo.net/images/weapon/db39203d81d60a7370d3ae966bc02ed14398366f.png",
  "20010": "https://app.splatoon2.nintendo.net/images/weapon/7d5ff3a57c3c3aaf28217bc3a79e02d665f13ba7.png",
  "20020": "https://app.splatoon2.nintendo.net/images/weapon/95077fe72924bcd64f37cd43aa49a12cd6329a7e.png",
  "20030": "https://app.splatoon2.nintendo.net/images/weapon/c2c0653d3246ea6df2b595c68e907f68eda49b08.png"
}

const StageName: { [name: number]: string } = {
  5000: "Spawning Grounds",
  5001: "Marooner's Bay",
  5002: "Lost Outpost",
  5003: "Salmonid Smokeyard",
  5004: "Ruins of Ark Polaris",
};

export default defineComponent({
  components: {
    IonItem,
    IonList,
    IonRefresher,
    IonRefresherContent,
    IonContent,
    IonLabel,
    IonImg,
  },
  setup() {
    const { t } = useI18n()
    const ionRouter = useIonRouter();
    const schedules: Ref<Schedule[]> = ref<Schedule[]>([]);

    console.log(`SERVER: ${process.env.VUE_APP_SERVER_URL}`);
    console.log(`API: ${process.env.VUE_APP_SERVER_API_VER}`);
    const url = `${process.env.VUE_APP_SERVER_URL}/${process.env.VUE_APP_SERVER_API_VER}/schedules`;
    fetch(url).then(response => response.json()).then((response: Schedules) => {
      schedules.value = response.results
    });

    return { schedules, StageType, StageName, WeaponType, ionRouter, t, dayjs };
  },
  methods: {
    onRefresh(event: CustomEvent) {
      setTimeout(() => {
        console.log('Async operation has ended');
        event.detail.complete();
      }, 1500);
    },
    weaponURL(weapon_id: number): string {
      return `https://app.splatoon2.nintendo.net/images/weapons/${weapon_id}`;
    },
    navigation(start_time: string) {
      const schedule_id = dayjs(start_time).unix();
      this.ionRouter.push(`/schedules/${schedule_id}`)
    }
  },
});
</script>

<template>
  <ion-content fullscreen>
    <ion-refresher slot="fixed" pull-factor=0.5 @ionRefresh="onRefresh($event)">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>
    <ion-list>
      <template v-for="schedule in schedules" :key="schedule.start_time">
        <ion-item button v-on:click="navigation(schedule.start_time)" mode="md">
          <ion-label>
            <section class="coop-schedule">
              <div class="coop-schedule-summary">
                <ion-label class="datetime">{{ dayjs(schedule.start_time).tz().format("YYYY/MM/DD HH:mm:ss") }}
                </ion-label>
                <ion-label class="stage-name">{{ t(`stage_name.${schedule.stage_id}`) }}</ion-label>
              </div>
              <div class="coop-schedule-weapon-list">
                <ul>
                  <li class="coop-schedule-weapon-list-item" v-for="weapon_id in schedule.weapon_list" :key="weapon_id">
                    <ion-img class="weapon" :src="WeaponType[weapon_id]"></ion-img>
                  </li>
                </ul>
              </div>
            </section>
          </ion-label>
        </ion-item>
      </template>
    </ion-list>
  </ion-content>
</template>

<style lang="scss" scoped>
@import "../theme/styles.scss";
</style>
