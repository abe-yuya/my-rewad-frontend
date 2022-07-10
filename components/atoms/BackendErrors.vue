<template>
  <ul
    v-if="backendErrorMessages.length > 0"
    id="backend-errors"
    class="text-red-400"
  >
    <template v-for="(error, index) in backendErrorMessages">
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
    backendErrorMessages: {
      type: Array,
      default: [],
    },
    // NOTE: エラー表示された時、スクロールしたくない箇所だけfalseにする
    isScroll: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const { backendErrorMessages, isScroll } = toRefs(props);

    watch(
      backendErrorMessages,
      async (): Promise<void> => {
        console.log('BackendError');
        console.log(backendErrorMessages);
        await nextTick();
        if (backendErrorMessages.value.length > 0 && isScroll.value) {
          VueScrollTo.scrollTo('#backend-errors');
        }
      }
    )
  }
})
</script>
