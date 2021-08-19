<template>
  <div
    ref="container"
    class="slider"
    @mousedown="mouseStart"
    @touchstart="touchStart"
  >
    <div class="__rail"></div>
    <div class="__track" :style="trackStyle"></div>
    <div class="__handler" :style="handlerStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const getMousePosition = (e: MouseEvent, rect: DOMRect) => {
  const pos = e.clientX - rect.left;
  return getPosition(pos, rect.width);
};
const getTouchPosition = (e: TouchEvent, rect: DOMRect) => {
  const pos = e.touches[0].clientX - rect.left;
  return getPosition(pos, rect.width);
};
const getPosition = (pos: number, width: number) => {
  return Math.min(width, Math.max(0, pos));
};

const parsePercentage = (value: number, max: number) => (value * 100) / max;
const parseProgress = (percentage: number, max: number) =>
  (percentage / 100) * max;

type TData = {
  progress: number;
};

export default defineComponent({
  props: {
    max: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  data(): TData {
    return {
      progress: 0,
    };
  },
  computed: {
    handlerStyle() {
      return {
        left: `${parsePercentage(this.value, this.max)}%`,
      };
    },
    trackStyle() {
      return {
        width: `${parsePercentage(this.value, this.max)}%`,
      };
    },
  },

  methods: {
    touchStart(e: TouchEvent) {
      const container = this.$refs.container as HTMLDivElement;
      const position = getTouchPosition(e, container.getBoundingClientRect());

      console.log(
        parsePercentage(position, container.getBoundingClientRect().width)
      );
    },
    mouseStart(e: MouseEvent) {
      const container = this.$refs.container as HTMLDivElement;
      const position = getMousePosition(e, container.getBoundingClientRect());

      const barPercentage = parsePercentage(
        position,
        container.getBoundingClientRect().width
      );

      this.progress = parseProgress(barPercentage, this.max);
    },
  },
  watch: {
    progress(value, oldValue) {
      if (value !== oldValue) this.$emit("updateProgress", value);
    },
  },
});
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  width: 100%;
  height: 14px;
  touch-action: none;

  .__rail,
  .__track,
  .__handler {
    position: absolute;
  }

  .__rail,
  .__track {
    height: 4px;
    margin-top: 5px;
    border-radius: 2px;
  }

  .__rail {
    width: 100%;
    background: var(--clr-primary-light);
  }

  .__track {
    background: var(--clr-secondary);
  }

  .__handler {
    width: 14px;
    height: 14px;
    left: 0;
    transform: translateX(-50%);

    cursor: grab;
    background: var(--clr-default);
    border-radius: 50%;
    border: 2px solid var(--clr-secondary);
    touch-action: pan-x;

    &:active {
      cursor: grabbing;
    }
  }
}
</style>
