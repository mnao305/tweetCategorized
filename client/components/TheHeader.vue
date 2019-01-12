<template>
  <v-toolbar
    clipped-left
    app>
    <v-toolbar-side-icon
      @click="$store.commit('categorybar/toggleFlag', !$store.state.categorybar.flag)" />
    <v-toolbar-title>tweetCategorized</v-toolbar-title>
    <v-spacer />
    <v-btn icon>
      <v-icon>more_vert</v-icon>
    </v-btn>
  </v-toolbar>
</template>
