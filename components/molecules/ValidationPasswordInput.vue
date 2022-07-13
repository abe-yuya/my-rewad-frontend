<template>
  <div class="mb-4">
    <label
      v-if="!!label"
      :for="inputName"
      class="label"
    >
      {{ label }}
    </label>
    <p v-if="!!descriptionText">
      {{ descriptionText }}
    </p>
    <ValidationProvider
      v-slot="{ failed, errors }"
      tag="div"
      :rules="rules"
    >
      <input
        :id="inputName"
        :value="inputValue"
        :type="isTypePassword ? 'password' : 'text'"
        :disabled="disabled"
        :placeholder="placeholder"
        @input="inputFunc"
        @focus="resetBackendError"
      />
      <p class="text-red-400">
        {{ errors[0] }}
      </p>
    </ValidationProvider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed} from '@nuxtjs/composition-api';
import '@/utils/validation-rules';
import { ValidationProvider } from "vee-validate";

export default defineComponent({
  components: {
    ValidationProvider,
  },
  props: {
    setValue: {
      type: String,
      required: false,
      default: undefined,
    },
    label: {
      type: String,
      required: false,
      default: undefined
    },
    placeholder: {
      type: String,
      required: false,
      default: undefined,
    },
    descriptionType: {
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
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    rules: {
      type: String,
      required: true,
    },
    backendErrorObj: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    const inputValue = ref<string>(props.setValue);
    const isTypePassword = ref<boolean>(true);
    const inputFunc = (e: Event): void => {
      if (!(e.target instanceof HTMLInputElement)) {
        return;
      }
      inputValue.value = e.target.value;
      ctx.emit('input', inputValue.value);
    };

    const typeChange = (): void => {
      isTypePassword.value = !isTypePassword;
    };

    // 説明文言
    const descriptionText = computed((): string => {
      const current = '現在設定しているパスワードをご入力ください。';
      const normal = '①アルファベット大文字②アルファベット小文字③数字④記号の3種類以上を含む8~31文字以内でご入力ください。';
      const confirm = '設定したパスワードをもう一度ご入力ください。';
      if(props.descriptionType === 'current') return current;
      if(props.descriptionType === 'normal') return normal;
      if(props.descriptionType === 'confirm') return confirm;
      return '';
    });


    // バックエンドエラー
    const hasBackendError = computed(
      (): boolean => props.backendErrorObj.failed,
    );
    const resetBackendError = (): void => {
      console.log(props.backendErrorObj.key);
      if (!props.backendErrorObj) return;
      ctx.emit('reset-backend-error', props.backendErrorObj.key);
    };

    return {
      inputValue,
      isTypePassword,
      inputFunc,
      typeChange,
      hasBackendError,
      resetBackendError,
      descriptionText
    };
  },
})
</script>
