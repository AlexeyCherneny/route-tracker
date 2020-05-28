<template>
  <div style="display: flex; justify-content: space-around;">
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
            <tr v-for="item in transportEvents" :key="item.id" v-on:click="center = [item.lt, item.ln]">
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
    <l-map
      style="height: 400px; width: 400px"
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url"></l-tile-layer>

      <l-marker
        v-for="item in transportEvents"
        :key="item.id"
        :lat-lng="[item.lt, item.ln]"
        v-on:click="center = [item.lt, item.ln]"
        @update:center="centerUpdated"
      ></l-marker>
    </l-map>
  </div>
</template>


<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Root",
  components: { LMap, LTileLayer, LMarker },
  computed: mapGetters(["parkings", "transportEvents"]),
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 13,
      center: [59.4231, 24.7523],
      bounds: null
    };
  },

  methods: {
    ...mapActions(["fetchParkings", "fetchfuelChanges"]),
       centerUpdated (center) {
      this.center = center;
    },
  },
  created: function() {
    this.fetchParkings();
    this.fetchfuelChanges();
  }
};
</script>

<style scoped>
.route-table {
  max-width: 600px;
}
</style>
