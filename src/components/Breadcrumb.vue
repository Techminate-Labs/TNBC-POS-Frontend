<template>
  <div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Breadcrumb',
  data() {
    return {
      links: [
        {
          url: 'subpage',
          title: "A relative link",
          text: "Subpage"
        },
        {
          url: 'https://external-site.com',
          title: "An absolute link",
          text: "External Site"
        },
      ]
    }
  }
})
</script>