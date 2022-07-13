<template>
  <section>
    <h1>ようこそ</h1>
    <p>{{ user.name }}</p>
    <button @click="logout" type="button">ログアウト</button>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, useRouter, computed } from '@nuxtjs/composition-api';
import { userStore } from '~/store'

export default defineComponent({
  setup(_) {
    const router = useRouter();

    const user = computed(() => {
      return userStore.getUser
    })

    async function logout() {
      await userStore.logout()
      router.push('/login')
    }


    return {
      user,
      logout,
    };
  },
});
</script>
