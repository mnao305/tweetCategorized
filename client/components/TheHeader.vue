<template>
  <v-toolbar
    clipped-left
    app>
    <v-toolbar-side-icon
      v-if="$route.path !== '/'"
      @click="$store.commit('categorys/toggleFlag', !$store.state.categorys.flag)"/>
    <v-toolbar-title>tweetCategorized</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>
