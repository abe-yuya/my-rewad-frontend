<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
<!--    <div class="mb-4">-->
<!--      <label for="email" class="block text-grey-darker text-sm font-bold mb-2">-->
<!--        メールアドレス-->
<!--      </label>-->
<!--      <input-->
<!--        id="email"-->
<!--        type="text"-->
<!--        v-model="inputValues.email"-->
<!--        placeholder="my-reward@example.com"-->
<!--        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"-->
<!--      >-->
<!--    </div>-->
    <BackendErrors :backend-errors="backendErrorValues" />
    <ValidationInput
      label="メールアドレス"
      input-name="email"
      rules="required|string|email|maxLength:255"
      placeholder="例) my-reward@example.com"
      :set-Value="inputValues.email"
      :backend-error-obj="isBackendError('email', backendErrorKeys)"
      @input="(v) => (inputValues.email = v)"
      @reset-backend-error="resetBackendErrors"
    />
    <div class="mb-6">
      <label for="password" class="block text-grey-darker text-sm font-bold mb-2">
        パスワード
      </label>
      <input
        id="password"
        type="password"
        v-model="inputValues.password"
        placeholder="password"
        class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
      >
      <p class="text-red text-xs italic">Please choose a password.</p>
    </div>
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
import BackendErrors from '~/components/atoms/BackendErrors';

export default defineComponent ({
  components: {
    ValidationInput,
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
        await userStore.login( {
          email: inputValues.email,
          password: inputValues.password,
        });
         // router.push('/welcome');
      } catch(error) {
        console.log('エラーーーーーーーーーーー');
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
