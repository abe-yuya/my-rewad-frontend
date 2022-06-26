<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
    <div class="mb-4">
      <label for="email" class="block text-grey-darker text-sm font-bold mb-2">
        メールアドレス
      </label>
      <input
        id="email"
        type="text"
        v-model="email"
        placeholder="my-reward@example.com"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
      >
    </div>
    <div class="mb-6">
      <label for="password" class="block text-grey-darker text-sm font-bold mb-2">
        パスワード
      </label>
      <input
        id="password"
        type="password"
        v-model="password"
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
import { userStore } from '~/store'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async submit() {
      await userStore.login({
        email: this.email,
        password: this.password,
      })
      this.$router.push('/welcome')
    },
    async register() {
      this.$router.push('/register')
    }
  },
}
</script>
