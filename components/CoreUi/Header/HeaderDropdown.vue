<template>
  <div class="pr-2">
    <b-link to="/login/logout">
      <em class="fas fa-sign-out-alt text-white"></em>
    </b-link>
  </div>
</template>

<script>
export default {
  name: 'HeaderDropdown',
  data: () => {
    return { itemsCount: 42 }
  },
}
</script>
