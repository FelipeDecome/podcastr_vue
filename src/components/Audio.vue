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
  TActionsTypes.SET_AUDIO_REF,
]);

const { currentEpisode: episode, ...getters } = mapGetters("player", [
  "progress",
  "currentEpisode",
  "isPlaying",
  "isLooping",
  "hasNext",
  "audioRef",
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
    setAudioRef: actions.SET_AUDIO_REF,
    setupProgressListener() {
      if (this.audioRef) {
        const audioRef = this.audioRef;

        audioRef.addEventListener("timeupdate", () => {
          this.updateProgress(audioRef.currentTime);
        });
      }
    },
    handleEpisodeEnded() {
      if (this.hasNext) {
        this.nextEpisode();
      } else {
        this.clearPlayer();
        this.updateProgress(0);
      }
    },
    handleSliderChange(progress: number) {
      if (this.audioRef) {
        this.audioRef.currentTime = progress;
        this.updateProgress(progress);
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
