<template>
  <section>
    <h1>ようこそ</h1>
    <p>{{ user.name }}</p>
    <button @click="logout" type="button">ログアウト</button>
  </section>
</template>

<script lang="ts">
import { userStore } from '~/store'

export default {
  computed: {
    user() {
      return userStore.getUser
    }
  },
  methods: {
    async logout() {
      await userStore.logout()
      this.$router.push('/login')
    }
  }
}
</script>
