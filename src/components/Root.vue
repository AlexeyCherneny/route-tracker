<template>
  <div>
    <div>{{ $store.getters.transportParkingsData }}</div>
  </div>
</template>

<script>
export default {
  name: "Root",
  data() {
    return {
      transportParkings
    };
  },
  created: function() {
    this.$store.dispatch("fetchTransportParkings");
    this.$store.dispatch("fetchTransportFuelChange");
  }
};
</script>

<style scoped>
</style>
