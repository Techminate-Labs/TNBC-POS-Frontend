<template>
  <component :is="layout" />
</template>

<script>
import GuestLayout from '@/components/layouts/GuestLayout.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import POSLayout from '@/components/layouts/POSLayout.vue'

export default {
  name: 'App',
  components: {
    GuestLayout,
    AdminLayout,
    POSLayout
  },
    beforeCreate () {
    this.$store.commit('initializeStore')
  },
  data() {
    return {
      layout: null,
    };
  },
  watch: {
    $route(to) {
      // set layout by route meta
      if (to.meta.layout !== undefined) {
        this.layout = to.meta.layout
      } else {
        this.layout = "GuestLayout" // this is default layout if route meta is not set
      }
    },
  },
}
</script>