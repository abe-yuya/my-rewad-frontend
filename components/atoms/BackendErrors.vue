<template>
  <ul
    v-if="backendErrors.length > 0"
    id="backend-errors"
  >
    <template v-for="(error, index) in backendErrors">
      <li :key="index">{{ `・${error}` }}</li>
    </template>
  </ul>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  watch,
  nextTick
} from '@nuxtjs/composition-api';
import VueScrollTo from 'vue-scrollto';

export default defineComponent({
  props: {
    backendErrors: {
      type: Array as () => string[],
      default: () => [],
    },
    // NOTE: エラー表示された時、スクロールしたくない箇所だけfalseにする
    isScroll: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { backendErrors, isScroll } = toRefs(props);

    watch(
      backendErrors,
      async (): Promise<void> => {
        await nextTick();
        if (backendErrors.value.length > 0 && isScroll.value) {
          VueScrollTo.scrollTo('#backend-errors');
        }
      }
    )
  }
})
</script>
