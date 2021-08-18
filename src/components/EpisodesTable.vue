<template>
  <table cellspacing="0">
    <thead>
      <tr>
        <th></th>
        <th class="--alignLeft">Episódio</th>
        <th>Data</th>
        <th>Duração</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="(episode, index) in episodes.slice(startAt)" :key="episode.id">
        <td>
          <img :src="episode.thumbnail" :alt="episode.title" class="__thumb" />
        </td>
        <td>
          <a :href="`/episode/${episode.id}`">{{ episode.title }}</a>
        </td>
        <td>
          <p>{{ $filters.formatEpisodeDate(episode.published_date) }}</p>
        </td>
        <td>
          <p>{{ $filters.formatEpisodeDuration(episode.duration) }}</p>
        </td>
        <td>
          <button
            type="button"
            class="__play"
            @click.prevent="
              playList({ episodeList: episodes, current: index + startAt })
            "
          >
            <Play />
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Play from "@/assets/play.svg";
import { TEpisode } from "@/@types/episode";
import { mapActions } from "vuex";
import { TActionsTypes } from "@/store/modules/player/actions";

export default defineComponent({
  components: {
    Play,
  },
  props: {
    episodes: {
      type: Array as PropType<TEpisode[]>,
    },
    startAt: {
      type: Number,
      default: 0,
    },
    mock: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    playList: mapActions("player", [TActionsTypes.PLAY_LIST]).PLAY_LIST,
  },
});
</script>

<style lang="scss" scoped>
table {
  width: 100%;

  th,
  td {
    padding: 0.75rem 1rem;
    border-bottom: 1px solid var(--clr-complement);

    &:not(:nth-child(2)) {
      text-align: center;
      white-space: nowrap;
    }
  }

  th {
    &.--alignLeft {
      text-align: left;
    }
  }

  td {
    .__thumb {
      height: 2.5rem;
      width: 2.5rem;
      border-radius: 0.5rem;
      object-fit: contain;
    }

    .__play {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
      border: 1px solid var(--clr-complement);
      font-size: 0;
      color: var(--clr-secondary);
      transition: all 0.2s;

      svg {
        width: 1.25rem;
        height: 1.25rem;
      }

      &:hover {
        background: var(--clr-secondary);
        color: var(--clr-text-in-colors);
      }
    }

    &:nth-child(2) a {
      display: -webkit-box;
      max-height: 1.25rem;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;

      text-decoration: none;
      transition: all 0.2s;

      &:hover {
        color: var(--clr-secondary);
      }
    }
  }

  tbody {
    tr {
      transition: all 0.2s;
      &:hover {
        background: var(--clr-default);
      }
    }
  }
}
</style>
