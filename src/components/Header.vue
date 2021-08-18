<script lang="ts">
import { defineComponent } from "vue";
import PodcastrLogo from "@/assets/podcastr-logo.svg";

export default defineComponent({
  name: "Header",
  components: {
    PodcastrLogo,
  },
});
</script>

<template>
  <header class="header">
    <div class="__container">
      <div class="__left">
        <a href="/">
          <PodcastrLogo class="__logo" />
        </a>
        <p class="__brandMessage">O melhor para você ouvir, sempre</p>
      </div>

      <div class="__right">
        <p class="__currentDate">{{ $filters.formatHeaderDate(new Date()) }}</p>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  padding: 1.25rem 4rem;
  background: var(--clr-default);
  border-bottom: 1px solid var(--clr-complement);

  .__container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .__left {
      display: flex;
      align-items: center;
      position: relative;

      gap: 2rem;

      .__logo {
        order: 1;
      }

      &:after {
        content: "";
        height: 1.25rem;
        width: 1px;
        background: var(--clr-complement);
        order: 2;
      }

      .__brandMessage {
        order: 3;
      }
    }

    .__right {
      .__currentDate {
        text-transform: capitalize;
      }
    }
  }
}
</style>
