<template>
  <audio
    ref="audio"
    :src="episode.url"
    v-if="episode"
    @play="togglePlay(true)"
    @pause="togglePlay(false)"
    :loop="isLooping"
    @loadedmetadata="setupProgressListener"
    autoplay
  />
</template>

<script lang="ts">
import { TActionsTypes } from "@/store/modules/player/actions";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";

const actions = mapActions("player", [
  TActionsTypes.TOGGLE_PLAY,
  TActionsTypes.UPDATE_PROGRESS,
  TActionsTypes.NEXT_EPISODE,
  TActionsTypes.CLEAR_PLAYER,
]);

const { currentEpisode: episode, ...getters } = mapGetters("player", [
  "progress",
  "currentEpisode",
  "isPlaying",
  "isLooping",
  "hasNext",
]);

export default defineComponent({
  computed: {
    episode,
    ...getters,
  },
  methods: {
    togglePlay: actions.TOGGLE_PLAY,
    updateProgress: actions.UPDATE_PROGRESS,
    nextEpisode: actions.NEXT_EPISODE,
    clearPlayer: actions.CLEAR_PLAYER,
    setupProgressListener() {
      const audioRef = this.$refs.audio as HTMLAudioElement;

      audioRef.addEventListener("timeupdate", () => {
        this.updateProgress(audioRef?.currentTime || 0);
      });
    },
    handleEpisodeEnded() {
      if (this.hasNext) {
        this.nextEpisode();
      } else {
        this.clearPlayer();
        this.updateProgress(0);
      }
    },
  },
  watch: {
    isPlaying() {
      const audio = this.$refs.audio as HTMLAudioElement;

      if (audio) {
        const action = this.isPlaying ? "play" : "pause";

        audio[action]();
      }
    },
  },
});
</script>
