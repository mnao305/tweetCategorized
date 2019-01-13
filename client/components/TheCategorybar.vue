<template>
  <v-navigation-drawer
    v-model="drawer"
    clipped
    mobile-break-point="900"
    app>
    <v-list>
      <template v-for="(item, index) in items">
        <v-list-tile
          :key="index"
          ripple>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
          </v-list-tile-content>
          <v-list-tile-action>{{ item.count }}</v-list-tile-action>
          <v-list-tile-action>
            <v-menu
              open-on-hover
              offset-y>
              <v-btn
                slot="activator"
                icon
              >
                <v-icon color="grey lighten-1">add_circle</v-icon>
              </v-btn>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title>いいねから追加</v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>URLから追加</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider
          :key="`divider-${index}`"
          dark />
      </template>
    </v-list>
    <div class="text-xs-center">
      <v-menu
        open-on-hover
        offset-y>
        <v-btn
          slot="activator"
          icon>
          <v-icon color="grey lighten-1">add_circle</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile>
            <v-list-tile-title>いいねから追加</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-title>URLから追加</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      // テスト用
      items: [
        {
          title: 'メチャシコ',
          count: 100,
          description: 'えちえちのえち'
        },
        {
          title: '有能',
          count: 25,
          description: ''
        },
        {
          title: '後で見る',
          count: 1,
          description: ''
        },
        {
          title: '参考メモ',
          count: 12,
          description: '技術系のもの'
        },
        {
          title: '面白い',
          count: 6,
          description: ''
        }
      ]
    }
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.categorybar.flag
      },
      set(val) {
        this.$store.commit('categorybar/toggleFlag', val)
      }
    }
  }
}
</script>
