<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <BackendErrors :backend-error-messages="backendErrorValues" />
    <ValidationInput
      label="メールアドレス"
      input-name="email"
      rules="required|string|email|maxLength:255"
      placeholder="例) my-reward@example.com"
      :set-Value="inputValues.email"
      :backend-error-obj="isBackendError('email', backendErrorKeys)"
      @input="inputValues.email = $event"
      @reset-backend-error="resetBackendErrors"
    />
    <ValidationPasswordInput
      label="パスワード"
      input-name="password"
      :rules="`required|password`"
      placeholder="パスワード"
      description-type="normal"
      :backend-error-obj="isBackendError('password', backendErrorKeys)"
      @input="inputValues.password = $event"
      @reset-bakcend-error="resetBackendErrors"
    />
    <div class="flex items-center justify-between">
      <button
        @click="submit"
        type="button"
      >
        ログイン
      </button>
      <button
        @click="register"
        type="button"
      >
        新規登録
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
        パスワードをお忘れの方
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, useRouter } from '@nuxtjs/composition-api';
import { userStore } from '~/store';
import { LoginValues } from '~/types/props-types';
import { filterBackendErrors } from '~/compositions/validation-styles';
import { isBackendError } from '~/compositions/validation-styles';
import ValidationInput from '~/components/molecules/ValidationInput.vue';
import ValidationPasswordInput from '~/components/molecules/ValidationPasswordInput.vue';
import BackendErrors from '~/components/atoms/BackendErrors.vue';

export default defineComponent ({
  components: {
    ValidationInput,
    ValidationPasswordInput,
    BackendErrors,
  },
  setup(_) {
    const router = useRouter();
    const inputValues = reactive<LoginValues>({
      email: '',
      password: '',
    });
    const backendErrorValues = ref<string[]>([]);
    const backendErrorKeys = ref<string[]>([]);

    async function submit() {
      try {
        await userStore.csrfCookie();
        const response = await userStore.login( {
          email: inputValues.email,
          password: inputValues.password,
        });

        if (response.data.status === 200) {
          router.push('/welcome');
        }

        // バリデーションエラー
        if (response.data.status === 422) {
          backendErrorKeys.value = Object.keys(response.data.messages);
          backendErrorValues.value = Object.values(response.data.messages, ).flat() as string[];
        }
      } catch(error) {
        console.log(error);
      }
    }

    const resetBackendErrors = (key: string) => {
      backendErrorKeys.value = filterBackendErrors(key, backendErrorValues.value);
    };

    async function register() {
      router.push('/register')
    }

    return {
      submit,
      register,
      inputValues,
      isBackendError,
      backendErrorValues,
      backendErrorKeys,
      resetBackendErrors
    };
  },
});
</script>
