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
            v-model="username"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="username"
            placeholder="ユーザー名"
          />
          <input
            type="text"
            v-model="email"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            placeholder="メールアドレス"
          />
          <input
            type="text"
            v-model="password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            placeholder="パスワード"
          />
          <input
            type="text"
            v-model="confirm_password"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="confirm_password"
            placeholder="パスワード（確認用）"
          />
          <input
            type="text"
            v-model="work_place"
            class="block border border-grey-light w-full p-3 rounded mb-4"
            name="work_place"
            placeholder="会社名"
          />
          <input
            type="text"
            v-model="occupation"
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
import { userStore } from '~/store'

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      work_place: '',
      occupation: '',
    }
  },
  methods: {
    async register() {
      await userStore.createUser({
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password,
        work_place: this.work_place,
        occupation: this.occupation,
      })
      this.$router.push('/welcome')
    },
    async login() {
      this.$router.push('/login')
    }
  }
}
</script>
