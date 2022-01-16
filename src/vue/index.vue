<template>
  <div>
    <ul>
      <div v-for="item in Routes" :key="item.path">
        <li v-if="item.path !== '/' && item.path !== '/home'">
          <router-link :to="item.path">{{ item.path }}</router-link>
        </li>
      </div>
    </ul>
  </div>
</template>
<script>
import Routes from "./router/routers";
export default {
  data() {
    return {
      Routes,
    };
  },
};
</script>