<template>
  <div class="episode" v-if="episode">
    <section class="__banner">
      <button
        class="__button --goback"
        type="button"
        @click.prevent="$router.push('/')"
      >
        <ArrowLeft />
      </button>
      <div>
        <img :src="episode.thumbnail" :alt="episode.title" />
      </div>
      <button
        class="__button --play"
        type="button"
        @click.prevent="play({ episode })"
      >
        <Play />
      </button>
    </section>
    <section class="__content">
      <header>
        <h1 class="__title">{{ episode.title }}</h1>
        <div class="__info">
          <p class="__publisher">{{ episode.publisher }}</p>
          <p class="__date">
            {{ $filters.formatEpisodeDate(episode.published_date) }}
          </p>
          <p class="__duration">
            {{ $filters.formatEpisodeDuration(episode.duration) }}
          </p>
        </div>
      </header>
      <main v-html="episode.description" />
    </section>
  </div>
</template>

<script lang="ts">
import { TEpisode } from "@/@types/episode";
import { api } from "@/services/api";
import { defineComponent, ref } from "vue";
import Play from "@/assets/play.svg";
import ArrowLeft from "@/assets/arrow-left.svg";
import { mapActions } from "vuex";
import { TActionsTypes } from "@/store/modules/player/actions";

interface IPodcast {
  title: string;
  publisher: string;
}

interface IEpisodeResponse {
  id: string;
  audio: string;
  title: string;
  thumbnail: string;
  pub_date_ms: number;
  description: string;
  audio_length_sec: number;
  podcast: IPodcast;
}

export default defineComponent({
  components: {
    Play,
    ArrowLeft,
  },
  setup() {
    const episode = ref<TEpisode>();

    const urlPaths = window.location.pathname.split("/");
    const id = urlPaths[urlPaths.length - 1];

    (async () => {
      const { data } = (await api.get(`episodes/${id}`)) as {
        data: IEpisodeResponse;
      };

      episode.value = {
        id: data.id,
        title: data.title,
        description: data.description,
        thumbnail: data.thumbnail,
        duration: data.audio_length_sec,
        publisher: data.podcast.publisher,
        podcastTitle: data.podcast.title,
        published_date: data.pub_date_ms,
        url: data.audio,
      };

      localStorage.setItem(
        `@Podcastr:episode:${id}`,
        JSON.stringify(episode.value)
      );
    })();

    return { episode };
  },
  methods: {
    play: mapActions("player", [TActionsTypes.PLAY]).PLAY,
  },
});
</script>

<style lang="scss" scoped>
.episode {
  padding: 3rem 4rem;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  section {
    width: 100%;
    max-width: 45rem;
    display: flex;
    flex-direction: column;

    &.__banner {
      position: relative;
      justify-content: center;

      div {
        border-radius: 1rem;
        height: 12rem;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow: hidden;

        img {
          object-fit: cover;
        }
      }

      .__button {
        position: absolute;
        min-width: 3rem;
        height: 3rem;
        color: var(--clr-default);
        font-size: 0;
        border-radius: 0.75rem;
        transition: all 0.2s;

        svg {
          width: 1.5rem;
          height: 1.5rem;
        }

        &.--goback {
          --transform: translateX(-50%);
          left: 0;
          transform: var(--transform);
          background: var(--clr-primary);

          svg {
            margin-right: 2px;
          }

          &:hover {
            background: var(--clr-primary-light);
            --transform: scale(1.08) translateX(-50%);
          }
        }

        &.--play {
          --transform: translateX(50%);
          right: 0;
          transform: var(--transform);
          background: var(--clr-secondary);

          &:hover {
            filter: brightness(1.1);
            --transform: scale(1.08) translateX(50%);
          }
        }

        &:hover {
          transform: var(--transform);
        }
      }
    }

    &.__content {
      padding: 0 2.5rem;

      gap: 2rem;

      header {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        border-bottom: 1px solid var(--clr-complement);
        padding-bottom: 1rem;

        .__title {
          font-size: 2rem;
        }

        .__info {
          display: flex;
          gap: 1rem;

          p {
            font-size: 0.875rem;
            color: var(--clr-text-default);
          }

          p:not(:first-child) {
            position: relative;
            padding-left: 1rem;

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

      main {
        font: var(--fs-body);
        color: var(--clr-text-default);
        line-height: 1.675rem;
        letter-spacing: 0.05em;

        ::v-deep div strong {
          color: var(--clr-text-heading);
          font: var(--fs-heading-2);
        }
      }
    }
  }
}
</style>
