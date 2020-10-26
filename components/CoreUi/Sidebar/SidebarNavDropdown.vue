<template>
  <nuxt-link id="nav-dropdown" :to="url" tag="li" class="nav-item nav-dropdown" disabled>
    <div class="nav-link nav-dropdown-toggle" @click="handleClick"><i :class="icon" /> {{ name }}</div>
    <ul class="nav-dropdown-items">
      <slot />
    </ul>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: '',
    },
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      const elements = e.target.parentElement.parentElement.querySelectorAll('.open')
      for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove('open')
      }
      e.target.parentElement.classList.toggle('open')
    },
  },
}
</script>
