<template>
  <section>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex-col items-center justify-center px-2">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">
            新規登録
          </h1>
          <BackendErrors :backend-error-messages="backendErrorValues" />
          <ValidationInput
            label="ユーザー名"
            input-name="username"
            rules="required|string|maxLength:255"
            placeholder="my-reward"
            :backend-error-obj="isBackendError('username', backendErrorKeys)"
            @input="inputValues.username = $event"
            @reset-backend-error="resetBackendErrors"
          />
          <ValidationInput
            label="メールアドレス"
            input-name="email"
            rules="required|email|maxLength:255"
            placeholder="例) my-reward@example.com"
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
            @reset-backend-error="resetBackendErrors"
          />
          <ValidationPasswordInput
            label="パスワード（確認用）"
            input-name="confirm_password"
            :rules="`required|password|isSamePassword:${inputValues.password}`"
            placeholder="パスワード（確認用）"
            description-type="confirm"
            :backend-error-obj="isBackendError('confirm_password', backendErrorKeys)"
            @input="inputValues.confirm_password = $event"
            @reset-backend-error="resetBackendErrors"
          />
          <ValidationInput
            label="会社名"
            input-name="work_place"
            rules="string|maxLength:255"
            placeholder="例)my-reward株式会社"
            :backend-error-obj="isBackendError('work_place', backendErrorKeys)"
            @input="inputValues.work_place = $event"
            @reset-backend-error="resetBackendErrors"
          />
          <ValidationInput
            label="職業"
            input-name="occupation"
            rules="string|maxLength:255"
            placeholder="例)エンジニア"
            :backend-error-obj="isBackendError('occupation', backendErrorKeys)"
            @input="inputValues.occupation = $event"
            @reset-backend-error="resetBackendErrors"
          />
          <button
            @click="register"
            type="button"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            新規登録
          </button>
        </div>
        <div class="text-grey-dark mt-6">
          <a
            @click="login"
            href="#"
            class="underline"
          >
            ログイン
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, useRouter } from '@nuxtjs/composition-api';
import { userStore } from '~/store';
import { signUpValues } from '~/types/props-types';
import { filterBackendErrors, isBackendError } from '~/compositions/validation-styles';
import BackendErrors from '~/components/atoms/BackendErrors.vue';
import ValidationInput from '~/components/molecules/ValidationInput.vue';
import ValidationPasswordInput from '~/components/molecules/ValidationPasswordInput.vue';

export default defineComponent({
  components: {
    ValidationInput,
    ValidationPasswordInput,
    BackendErrors,
  },
  setup(_) {
    const router = useRouter();
    const inputValues = reactive<signUpValues>({
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      work_place: '',
      occupation: '',
    });
    const backendErrorValues = ref<string[]>([]);
    const backendErrorKeys = ref<string[]>([]);


    async function register() {
      try {
        const response = await userStore.createUser({
          username: inputValues.username,
          email: inputValues.email,
          password: inputValues.password,
          confirm_password: inputValues.confirm_password,
          work_place: inputValues.work_place,
          occupation: inputValues.occupation,
        });
        if (response.data.status === 200) {
          router.push('/welcome')
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

    // NOTE: emit時にバックエンドのエラーをリセットする目的
    const resetBackendErrors = (key: string) => {
      backendErrorKeys.value = filterBackendErrors(key, backendErrorKeys.value);
    };

    async function login() {
      router.push('/login')
    }


    return {
      register,
      login,
      inputValues,
      resetBackendErrors,
      backendErrorKeys,
      backendErrorValues,
      isBackendError
    }
  },
});
</script>
