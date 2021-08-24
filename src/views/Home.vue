<template>
  <div class="home">
    <section class="section last_episodes">
      <h2 class="__heading">Últimos lançamentos</h2>

      <ul class="__list">
        <li
          v-for="(episode, index) in lastEpisodes"
          :key="episode.id"
          class="__item"
        >
          <EpisodeCard
            :episode="episode"
            @play="playList({ episodeList: episodes, current: index })"
          />
        </li>
      </ul>
    </section>
    <section class="section episodes">
      <h2 class="__heading">Todos os episódios</h2>
      <EpisodesTable :episodes="allEpisodes" @play="handleTablePlay" />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { api } from "@/services/api";
import { TEpisode } from "@/@types/episode";
import EpisodeCard from "@/components/EpisodeCard.vue";
import EpisodesTable from "@/components/EpisodesTable.vue";
import { mapActions } from "vuex";
import { TActionsTypes } from "@/store/modules/player/actions";

interface IEpisodeResponse {
  id: string;
  audio: string;
  title: string;
  thumbnail: string;
  pub_date_ms: number;
  description: string;
  audio_length_sec: number;
}

interface IReponse {
  title: string;
  publisher: string;
  episodes: IEpisodeResponse[];
}

const actions = mapActions("player", [TActionsTypes.PLAY_LIST]);

export default defineComponent({
  name: "Home",
  components: {
    EpisodeCard,
    EpisodesTable,
  },
  data() {
    return {
      lastEpisodesLoading: true,
      mockedLastEpisodes: [{ id: "1" }, { id: "2" }],
    };
  },
  setup() {
    const episodes = ref<TEpisode[]>([]);

    (async () => {
      try {
        const { data } = (await api.get(
          "podcasts/618f72ea42f94904bd29cfc1a6edc8b1"
        )) as { data: IReponse };

        const parsedEpisodes = data.episodes.map(
          (episode) =>
            ({
              id: episode.id,
              title: episode.title,
              description: episode.description,
              thumbnail: episode.thumbnail,
              duration: episode.audio_length_sec,
              publisher: data.publisher,
              podcastTitle: data.title,
              published_date: episode.pub_date_ms,
              url: episode.audio,
            } as TEpisode)
        );

        episodes.value = parsedEpisodes;
      } catch (e) {
        console.log(e);
      }
    })();

    return { episodes };
  },
  computed: {
    lastEpisodes(): TEpisode[] {
      return this.episodes.slice(0, 2);
    },

    allEpisodes(): TEpisode[] {
      return this.episodes.slice(2);
    },
  },
  methods: {
    playList: actions.PLAY_LIST,

    handleTablePlay(index: number) {
      this.playList({ episodeList: this.episodes, current: index + 2 });
    },
  },
});
</script>

<style lang="scss">
.home {
  padding: 3rem 4rem;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  .section {
    width: 100%;
    max-width: 62rem;

    display: flex;
    flex-direction: column;
    gap: 2rem;

    .__list {
      display: flex;
      list-style: none;
      gap: 2rem;

      .__item {
        flex: 1;
      }
    }
  }
}
</style>
