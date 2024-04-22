<template>
  <h1>登录</h1>
  <h3>{{ name }}</h3>
  <button @click="gotoHome">跳转首页</button>
</template>

<script setup lang="ts">
import { router } from '@/router';
import { useUserStore } from '@/store/modules/user';
import { computed } from 'vue';


const userStore = useUserStore();

let name = computed(() => userStore.username);

const gotoHome = () => {
  router.push('/home');
};


</script>

<style scoped></style>
