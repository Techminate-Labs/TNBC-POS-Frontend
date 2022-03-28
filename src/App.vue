<template>
  <component :is="layout" />
</template>

<script>
import GuestLayout from '@/components/layouts/GuestLayout.vue'
import AdminLayout from '@/components/layouts/AdminLayout.vue'
import POSLayout from '@/components/layouts/POSLayout.vue'
import MinimalLayout from '@/components/layouts/MinimalLayout.vue'

export default {
  name: 'App',
  components: {
    GuestLayout,
    AdminLayout,
    POSLayout,
    MinimalLayout
  },
  beforeCreate () {
    // this.$store.commit('initializeStore')
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
        this.layout = "MinimalLayout" // this is default layout if route meta is not set
      }
    },
  },
}
</script>