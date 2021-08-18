<template>
  <div class="pageContainer">
    <main>
      <Header />
      <router-view />
    </main>
    <Player />
    <Audio />
  </div>
</template>

<script lang="ts">
import Header from "@/components/Header.vue";
import Player from "@/components/Player.vue";
import Audio from "@/components/Audio.vue";

import { defineComponent } from "vue";
export default defineComponent({
  components: {
    Header,
    Player,
    Audio,
  },
});
</script>

<style lang="scss">
:root {
  --clr-default: #ffffff;
  --clr-background: #f5f6fa;
  --clr-complement: #e6e8eb;

  --clr-text-heading: #494d4b;
  --clr-text-default: #808080;
  --clr-text-complement: #afb2b1;
  --clr-text-in-colors: #ffffff;

  --clr-primary-light: #8f278c;
  --clr-primary: #6b0b69;
  --clr-primary-dark: #490047;
  --clr-secondary: #03d8e5;
  --clr-gradient: linear-gradient(
    143.8deg,
    rgba(143, 39, 140, 0.8) 0%,
    rgba(143, 39, 140, 0) 100%
  );

  --fs-body: 400 0.875rem "Inter", sans-serif;
  --fs-heading-2: 600 1rem "Lexend", sans-serif;
  --fs-heading-1: 600 1.5rem "Lexend", sans-serif;
  --fs-caption: 500 0.75rem "Lexend", sans-serif;
}

* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

p,
span,
a {
  font: var(--fs-body);
  color: var(--clr-text-default);
}

h1,
h2 {
  font: var(--fs-heading-1);
}

body,
input,
button,
h3,
h4,
h5,
h6 {
  font: var(--fs-heading-2);
}

h1,
h2,
h3,
h4,
h5,
h6 {
  color: var(--clr-text-heading);
}

td {
  font: var(--fs-body);
  color: var(--clr-text-default);
}

td a {
  font: var(--fs-heading-2);
  color: var(--clr-text-heading);
}

th {
  font: var(--fs-caption);
  color: var(--clr-text-complement);
  text-transform: uppercase;
}

th a {
  text-decoration: none;
}

button {
  cursor: pointer;
  border: 0;
  background: transparent;
}

body {
  background: var(--clr-background);
}

#app {
  height: 100vh;
  overflow: hidden;
}

.pageContainer {
  display: flex;
  height: 100%;

  main {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
}
</style>
