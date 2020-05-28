<template>
  <div class="root">
    <div class="route-table">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Type</th>
              <th class="text-left">Time</th>
              <th class="text-left">Сonsumption</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in transportEvents"
              :key="item.id"
              v-on:click="activeEventId = item.id"
              v-bind:class="{ active: activeEventId === item.id }"
            >
              <td>{{ item.title }}</td>

              <td v-if="item.type === 'parking'">{{ item.start_time }} - {{ item.stop_time }}</td>
              <td v-else>{{ item.fuel_time }}</td>

              <td v-if="item.type === 'parking'"></td>
              <td v-else>{{ item.amount }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
    <l-map class="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url"></l-tile-layer>

      <l-marker
        v-for="item in transportEvents"
        :key="item.id"
        :lat-lng="[item.lt, item.ln]"
        v-on:click="activeEventId = item.id"
      ></l-marker>
    </l-map>
  </div>
</template>


<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { mapGetters, mapActions } from "vuex";

const defaultCenter = [59.4231, 24.7523];
const defaultZoom = 13;
const tileURL = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const defaultIcon = {};

export default {
  name: "Root",
  components: { LMap, LTileLayer, LMarker },
  computed: {
    ...mapGetters(["parkings", "transportEvents"]),
    center() {
      const activeEvent = this.transportEvents.find(
        e => e.id === this.activeEventId
      );
      return activeEvent ? [activeEvent.lt, activeEvent.ln] : defaultCenter;
    }
  },
  data() {
    return {
      url: tileURL,
      zoom: defaultZoom,
      activeEventId: null
    };
  },

  methods: mapActions(["fetchParkings", "fetchfuelChanges"]),

  created: function() {
    this.fetchParkings();
    this.fetchfuelChanges();
  }
};
</script>

<style scoped>
.root {
  display: flex;
  justify-content: space-around;
}

.map {
  height: 400px;
  width: 400px;
}

.route-table {
  max-width: 600px;
}
.active {
  opacity: 1;
}
</style>
