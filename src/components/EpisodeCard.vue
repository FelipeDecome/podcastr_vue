<template>
  <!-- <template v-if="!mock"> -->
  <div class="card">
    <header>
      <div class="__podcast-info">
        <img :src="episode.thumbnail" alt="episode.title" class="__thumb" />
        <div class="__content">
          <h3 class="__title">{{ episode.podcastTitle }}</h3>
          <p class="__publisher">{{ episode.publisher }}</p>
        </div>
      </div>

      <button class="__play" type="button" @click.prevent="$emit('play')">
        <Play />
      </button>
    </header>
    <span class="__divider" />
    <main>
      <a :href="`/episode/${episode.id}`">
        <h3 class="__title">{{ episode.title }}</h3>
      </a>
      <p class="__desc">
        {{ episode.description }}
      </p>
    </main>
    <footer>
      <p class="__date">
        {{ $filters.formatEpisodeDate(episode.published_date) }}
      </p>
      <p class="__duration">
        {{ $filters.formatEpisodeDuration(episode.duration) }}
      </p>
    </footer>
  </div>
  <!-- </template> -->

  <!-- <template v-else>
    <div class="card mock">
      <header>
        <div class="__podcast-info">
          <div class="__thumb" />
          <div class="__content">
            <div class="__title" />
            <div class="__publisher" />
          </div>
        </div>
      </header>
      <main></main>
      <footer></footer>
    </div>
  </template> -->
</template>

<script lang="ts">
import { TEpisode } from "@/@types/episode";
import Play from "@/assets/play.svg";
import { TActionsTypes } from "@/store/modules/player/actions";
import { defineComponent, PropType } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "EpisodeCard",
  props: {
    episode: {
      type: Object as PropType<TEpisode>,
    },
    mock: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Play,
  },
  methods: {
    play: mapActions("player", [TActionsTypes.PLAY]).PLAY,
  },
});
</script>

<style lang="scss" scoped>
.card {
  padding: 1.5rem 2rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background: var(--clr-default);
  border: 1px solid var(--clr-complement);
  border-radius: 1.5rem;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;

    .__podcast-info {
      display: flex;
      align-items: center;
      gap: 1rem;

      .__thumb {
        height: 4rem;
        width: 4rem;
        border-radius: 1rem;
        object-fit: contain;
        background: var(--clr-background);
      }

      .__content {
        .__publisher {
          margin-top: 0.5rem;
        }
      }
    }

    .__play {
      min-width: 2.5rem;
      height: 2.5rem;
      color: var(--clr-secondary);
      font-size: 0;
      border-radius: 0.5rem;
      border: 1px solid var(--clr-complement);
      transition: all 0.2s;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      &:hover {
        background: var(--clr-background);
      }
    }
  }

  .__divider {
    display: block;
    height: 1px;
    background: var(--clr-complement);
  }

  main {
    padding-right: 2rem;

    a {
      text-decoration: none;

      .__title {
        transition: all 0.2s;
      }

      &:hover .__title {
        color: var(--clr-secondary);
      }
    }

    .__desc {
      padding-left: 1.5rem;
      line-height: 1.5rem;
      max-height: 4.5rem;

      display: -webkit-box;
      position: relative;
      margin-top: 1rem;

      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        height: 100%;
        width: 0.3rem;
        background: var(--clr-secondary);
        opacity: 0.4;
        border-radius: 0.3rem 0 0 0.3rem;
      }
    }
  }

  footer {
    display: flex;
    gap: 0.5rem;
    justify-content: flex-end;
    padding-right: 3rem;

    p {
      font-size: 0.75rem;
      opacity: 0.7;

      &.__duration {
        position: relative;
        padding-left: 0.5rem;

        &::after {
          content: "";
          width: 4px;
          height: 4px;
          border-radius: 2px;
          background: var(--clr-complement);
          position: absolute;
          left: 0px;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
