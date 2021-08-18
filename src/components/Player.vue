<script lang="ts">
import Playing from "@/assets/playing.svg";
import Shuffle from "@/assets/shuffle.svg";
import Previous from "@/assets/previous.svg";
import Play from "@/assets/play.svg";
import Pause from "@/assets/pause.svg";
import Next from "@/assets/next.svg";
import Repeat from "@/assets/repeat.svg";
import Slider from "./Slider.vue";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import { TActionsTypes } from "@/store/modules/player/actions";

const actions = mapActions("player", [
  TActionsTypes.UPDATE_PROGRESS,
  TActionsTypes.TOGGLE_PLAY,
  TActionsTypes.TOGGLE_LOOP,
  TActionsTypes.TOGGLE_SHUFFLE,
  TActionsTypes.NEXT_EPISODE,
  TActionsTypes.PREVIOUS_EPISODE,
]);

export default defineComponent({
  name: "Player",
  components: {
    Slider,
    Playing,
    Shuffle,
    Previous,
    Play,
    Pause,
    Next,
    Repeat,
  },
  computed: {
    ...mapGetters("player", [
      "currentEpisode",
      "playlistLength",
      "hasNext",
      "current",
      "playlist",
      "isPlaying",
      "isLooping",
      "shuffle",
      "progress",
    ]),
    status(): Record<string, string> {
      return {
        message: this.currentEpisode ? "Tocando agora" : "Nada tocando",
        class: this.currentEpisode ? "--playing" : "--notPlaying",
      };
    },
  },
  methods: {
    updateProgress: actions.UPDATE_PROGRESS,
    togglePlay: actions.TOGGLE_PLAY,
    toggleLoop: actions.TOGGLE_LOOP,
    toggleShuffle: actions.TOGGLE_SHUFFLE,
    nextEpisode: actions.NEXT_EPISODE,
    previousEpisode: actions.PREVIOUS_EPISODE,
  },
});
</script>

<template>
  <aside class="player">
    <header class="__header" :class="status.class">
      <Playing :aria-label="status.message" />
      <span>{{ status.message }}</span>
    </header>

    <div class="__content" :class="[{ '--empty': !currentEpisode }]">
      <template v-if="currentEpisode">
        <img :src="currentEpisode.thumbnail" />
        <h3>{{ currentEpisode.title }}</h3>
        <p>{{ currentEpisode.publisher }}</p>
      </template>

      <div class="__empty" v-else>
        <span class="__text">Selecione um podcast para ouvir</span>
      </div>
    </div>

    <footer class="__footer" :class="[{ '--empty': !currentEpisode }]">
      <!-- Criar slider component -->
      <div class="__progress" v-if="currentEpisode">
        <span class="__time">
          {{ $filters.formatEpisodeDuration(progress) }}
        </span>
        <div class="__slider">
          <Slider :max="currentEpisode.duration" :value="progress" />
        </div>
        <span class="__time">
          {{ $filters.formatEpisodeDuration(currentEpisode.duration) }}
        </span>
      </div>

      <div class="__progress" v-else>
        <span class="__time">00:00</span>
        <div class="__slider">
          <div class="__empty"></div>
        </div>
        <span class="__time">00:00</span>
      </div>

      <div class="__controls">
        <button
          type="button"
          :class="[{ active: shuffle }]"
          @click.prevent="toggleShuffle"
          :disabled="!currentEpisode"
        >
          <Shuffle />
        </button>

        <button
          type="button"
          @click.prevent="previousEpisode"
          :disabled="!currentEpisode || current === 0 || shuffle"
        >
          <Previous />
        </button>

        <button
          type="button"
          @click="togglePlay"
          class="__togglePlay"
          :class="{ '--pause': isPlaying }"
          :disabled="!currentEpisode"
        >
          <Play v-if="!isPlaying || !currentEpisode" />
          <Pause v-else />
        </button>

        <button
          type="button"
          @click.prevent="nextEpisode"
          :disabled="!currentEpisode || !hasNext"
        >
          <Next />
        </button>

        <button
          type="button"
          :class="[{ active: isLooping }]"
          @click.prevent="toggleLoop"
          :disabled="!currentEpisode"
        >
          <Repeat />
        </button>
      </div>
    </footer>
  </aside>
</template>

<style lang="scss">
.player {
  width: 26.5rem;
  height: 100%;
  background: var(--clr-primary);
  padding: 2.25rem 4rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & > * {
    align-self: stretch;
  }

  .__header {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    span {
      font: var(--fs-heading-2);
      color: var(--clr-text-in-colors);
    }

    &.--playing svg {
      color: var(--clr-secondary);
    }

    &.--notPlaying svg {
      color: var(--clr-primary-light);
    }
  }

  .__content {
    &.--empty {
      height: 21.6rem;
      border: 1.5px dashed rgba(255, 255, 255, 0.3);
      border-radius: 1.5rem;
      overflow: hidden;

      .__empty {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        height: 100%;
        background: var(--clr-gradient);

        .__text {
          max-width: 10rem;

          text-align: center;
          font: var(--fs-heading-2);
          color: var(--clr-text-in-colors);
        }
      }
    }

    &:not(.--empty) {
      text-align: center;

      img {
        border-radius: 1.5rem;
      }

      h3,
      p {
        color: var(--clr-text-in-colors);
      }

      h3 {
        margin-top: 2rem;
        font-size: 1.25rem;
      }

      p {
        font-size: 1rem;
        margin-top: 0.5em;
        opacity: 0.6;
      }
    }
  }

  .__footer {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;

    &.--empty .__progress {
      opacity: 0.5;
    }

    .__progress {
      display: flex;
      align-items: center;
      gap: 1rem;

      .__time {
        color: var(--clr-text-in-colors);
      }

      .__slider {
        position: relative;
        flex: 1;

        .__empty,
        .__back {
          width: 100%;
          height: 4px;
          background: var(--clr-primary-light);
          border-radius: 2px;
        }

        .__current {
          position: absolute;
          top: 0;
          left: 0;
          height: 4px;
          border-radius: 2px;

          background: var(--clr-secondary);
        }
      }
    }

    .__controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 1.5rem;

      button {
        cursor: pointer;
        background: transparent;
        border: 0;
        font-size: 0px;
        width: 2rem;
        height: 2rem;

        transition: all 0.2s;

        svg {
          color: var(--clr-text-in-colors);
        }

        &.__togglePlay {
          width: 4rem;
          height: 4rem;

          background: var(--clr-primary-light);
          border-radius: 1rem;
          transition: all 0.2s;

          &.--pause {
            background: var(--clr-primary-dark);
          }
        }

        &:disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        &:not(:disabled) {
          &.active {
            svg {
              color: var(--clr-secondary);
            }

            &:hover svg {
              filter: brightness(1.2);
            }
          }

          &:hover:not(.active) {
            opacity: 0.6;
          }
        }
      }
    }
  }
}
</style>
