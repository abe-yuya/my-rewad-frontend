<template>
  <section>
    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex-col items-center justify-center px-2">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">
            新規登録
          </h1>
          <input
            type="text"
            v-model="inputValues.username"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="ユーザー名"
          />
          <input
            type="text"
            v-model="inputValues.email"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="メールアドレス"
          />
          <input
            type="text"
            v-model="inputValues.password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="パスワード"
          />
          <input
            type="text"
            v-model="inputValues.confirm_password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="パスワード（確認用）"
          />
          <input
            type="text"
            v-model="inputValues.work_place"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="work_place"
            placeholder="会社名"
          />
          <input
            type="text"
            v-model="inputValues.occupation"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="occupation"
            placeholder="職業"
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
import { defineComponent, ref, reactive, useRouter } from '@nuxtjs/composition-api'
import { userStore } from '~/store'
import { signUpValues } from '~/types/props-types'
import { filterBackendErrors } from '~/compositions/validation-styles'

export default defineComponent({
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
        await userStore.createUser({
          username: inputValues.username,
          email: inputValues.email,
          password: inputValues.password,
          confirm_password: inputValues.confirm_password,
          work_place: inputValues.work_place,
          occupation: inputValues.occupation,
        });
         // router.push('/welcome')
      } catch(error) {
        backendErrorKeys.value = [
          'username',
          'email',
          'password',
          'confirm_password',
          'work_place',
          'occupation',
        ];
        backendErrorValues.value = [error.response.data.messages];
      }
    }

    const resetBackendErrors = (key: string) => {
      backendErrorKeys.value = filterBackendErrors(key, backendErrorValues.value);
    };

    async function login() {
      router.push('/login')
    }


    return {
      register,
      login,
      inputValues,
    }
  },
});
</script>
