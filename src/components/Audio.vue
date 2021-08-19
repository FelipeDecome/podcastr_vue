<template>
  <audio
    ref="audio"
    :src="episode.url"
    v-if="episode"
    @play="togglePlay(true)"
    @pause="togglePlay(false)"
    @ended="handleEpisodeEnded"
    :loop="isLooping"
    @loadedmetadata="setupProgressListener"
    autoplay
  />
</template>

<script lang="ts">
import { TActionsTypes } from "@/store/modules/player/actions";
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import throttle from "lodash.throttle";

const actions = mapActions("player", [
  TActionsTypes.TOGGLE_PLAY,
  TActionsTypes.UPDATE_PROGRESS,
  TActionsTypes.NEXT_EPISODE,
  TActionsTypes.CLEAR_PLAYER,
  TActionsTypes.REGISTER_AUDIO_REF,
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
    registerAudioRef: actions.REGISTER_AUDIO_REF,
    setupProgressListener() {
      if (this.audioRef)
        this.audioRef.addEventListener(
          "timeupdate",
          throttle(this.handleTimeUpdate, 200)
        );
    },
    handleEpisodeEnded() {
      if (this.hasNext) {
        this.nextEpisode();
      } else {
        this.clearPlayer();
        this.updateProgress(0);
      }
    },
    handleTimeUpdate() {
      this.updateProgress(this.audioRef?.currentTime || 0);
    },
  },
  watch: {
    async episode(value) {
      if (!value) return;
      if (!this.audioRef) {
        await this.$nextTick();
        this.registerAudioRef(this.$refs.audio as HTMLAudioElement);
      }
    },
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
