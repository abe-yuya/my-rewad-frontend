<template>
  <div class="mb-4">
    <label
      v-if="!!label"
      :for="inputName"
      class="block text-grey-darker text-sm font-bold mb-2"
    >
      {{ label }}
    </label>
    <span v-if="required">*</span>
    <ValidationProvider
      v-slot="{ failed, errors }"
      tag="div"
      class="provider"
      :rules="rules"
    >
      <input
        :id="inputName"
        :value="inputValue"
        type="text"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="inputFunc"
        @focus="resetBackendError"
      >
      <p v-if="errors.length > 0" class="text-red-400">
        {{ errors[0] }}
      </p>
    </ValidationProvider>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  PropType,
} from '@nuxtjs/composition-api';
// バリデーション
import '@/utils/validation-rules';
import { ValidationProvider } from "vee-validate";
import { backendErrorObject } from '~/types/props-types'

export default defineComponent({
  components: {
    ValidationProvider,
  },
  props: {
    setValue: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      required: false,
      default: undefined,
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    inputName: {
      type: String,
      required: false,
      default: undefined,
    },
    required: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: String,
      default: '',
    },
    backendErrorObj: {
      type: Object as PropType<backendErrorObject>,
      default: undefined,
    },
  },
  setup(props,ctx ) {
    const inputValue = ref<string | number>(props.setValue);
    const inputFunc = (e: Event) => {
      if(!(e.target instanceof HTMLInputElement)) {
        return;
      }
      inputValue.value = e.target.value;

      ctx.emit('input', inputValue.value);
    };
    // バックエンドエラー系
    const hasBackendError = computed(
      (): boolean => props.backendErrorObj?.failed,
    );
    const resetBackendError = (): void => {
      if (!props.backendErrorObj) return;
      ctx.emit('reset-backend-error', props.backendErrorObj.key);
    };

    return {
      inputValue,
      inputFunc,
      hasBackendError,
      resetBackendError,
    };
  },
});
</script>
