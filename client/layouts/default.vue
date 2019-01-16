<template>
  <v-app>
    <the-header/>
    <TheCategorybar />
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <the-footer />
  </v-app>
</template>

<script>
import TheHeader from '~/components/TheDashboardHeader.vue'
import TheFooter from '~/components/TheFooter.vue'
import TheCategorybar from '~/components/TheCategorybar.vue'

export default {
  components: {
    TheHeader,
    TheFooter,
    TheCategorybar
  }
}
</script>
