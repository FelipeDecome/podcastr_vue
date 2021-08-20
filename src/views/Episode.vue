<template>
  <div class="episode">
    <section class="__banner">{{ $route.params.id }}</section>
    <section class="__content"></section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({});
</script>

<style lang="scss" scoped>
.episode {
  padding: 3rem 4rem;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
</style>
