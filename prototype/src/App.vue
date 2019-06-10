<template>
  <v-app>
    <v-toolbar app dark color="primary">
      <router-link to="/" class="headline text-uppercase">
        <span>Deputy</span><span class="font-weight-light hidden-xs-only"> - Frontend Challenge</span>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        flat
        href="https://github.com/tamm/deputyfrontendchallenge"
        target="_blank"
      >
        <span class="mr-2">Source</span>
      </v-btn>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      //
    }
  },
}
</script>

<style lang="stylus" scoped>
  .headline
    color inherit
    text-decoration none
</style>