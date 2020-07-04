<template>
  <div class="sidebar">
    <SidebarHeader />
    <SidebarForm />
    <nav class="sidebar-nav">
      <div slot="header">
        <div class="sidebar-header text-center p-2">
          <nuxt-link to="/main/perfil">
            <img
              :src="url + '/foto/' + user.persona.uuid"
              alt="Avatar"
              width="60"
              height="60"
              class="img-thumbnail rounded-circle"
            />
          </nuxt-link>
          <p>
            {{ user.persona.nombre }}
            <br />
            <small>Educador Scout</small>
          </p>
        </div>
      </div>
      <ul class="nav">
        <template v-for="item in navItems">
          <template v-if="item.title">
            <SidebarNavTitle :key="item.key" :name="item.name" :classes="item.class" :wrapper="item.wrapper" />
          </template>
          <template v-else-if="item.divider">
            <SidebarNavDivider :key="item.key" :classes="item.class" />
          </template>
          <template v-else-if="item.label">
            <SidebarNavLabel
              :key="item.key"
              :name="item.name"
              :url="item.url"
              :icon="item.icon"
              :label="item.label"
              :classes="item.class"
            />
          </template>
          <template v-else>
            <template v-if="item.children">
              <!-- First level dropdown -->
              <SidebarNavDropdown
                v-if="item.acl === undefined || $can(item.acl)"
                :key="item.key"
                :name="item.name"
                :url="item.url"
                :icon="item.icon"
              >
                <template v-for="childL1 in item.children">
                  <template v-if="childL1.children">
                    <!-- Second level dropdown -->
                    <SidebarNavDropdown :key="childL1.key" :name="childL1.name" :url="childL1.url" :icon="childL1.icon">
                      <li v-for="childL2 in childL1.children" :key="childL2.key" class="nav-item">
                        <SidebarNavLink
                          :name="childL2.name"
                          :url="childL2.url"
                          :icon="childL2.icon"
                          :badge="childL2.badge"
                          :variant="item.variant"
                        />
                      </li>
                    </SidebarNavDropdown>
                  </template>
                  <template v-else>
                    <!-- eslint-disable -->
                    <SidebarNavItem :classes="item.class">
                      <SidebarNavLink
                        v-if="childL1.acl === undefined || $can(childL1.acl)"
                        :name="childL1.name"
                        :url="childL1.url"
                        :icon="childL1.icon"
                        :badge="childL1.badge"
                        :variant="item.variant"
                      />
                    </SidebarNavItem>
                    <!-- eslint-enable -->
                  </template>
                </template>
              </SidebarNavDropdown>
            </template>
            <template v-else>
              <SidebarNavItem :key="item.key" :classes="item.class">
                <SidebarNavLink
                  v-if="item.acl === undefined || $can(item.acl)"
                  :name="item.name"
                  :url="item.url"
                  :icon="item.icon"
                  :badge="item.badge"
                  :variant="item.variant"
                />
              </SidebarNavItem>
            </template>
          </template>
        </template>
      </ul>
      <slot />
    </nav>
    <SidebarFooter />
    <!--<SidebarMinimizer/>-->
  </div>
</template>
<script>
import SidebarFooter from './SidebarFooter'
import SidebarForm from './SidebarForm'
import SidebarHeader from './SidebarHeader'
import SidebarNavDivider from './SidebarNavDivider'
import SidebarNavDropdown from './SidebarNavDropdown'
import SidebarNavLink from './SidebarNavLink'
import SidebarNavTitle from './SidebarNavTitle'
import SidebarNavItem from './SidebarNavItem'
import SidebarNavLabel from './SidebarNavLabel'
export default {
  name: 'Sidebar',
  components: {
    SidebarFooter,
    SidebarForm,
    SidebarHeader,
    SidebarNavDivider,
    SidebarNavDropdown,
    SidebarNavLink,
    SidebarNavTitle,
    SidebarNavItem,
    SidebarNavLabel,
  },
  props: {
    navItems: {
      type: Array,
      required: true,
      default: () => [],
    },
    fixed: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    url() {
      return process.env.API_HOST
    },
  },
  mounted() {
    this.isFixed(this.fixed)
  },
  methods: {
    isFixed() {
      this.fixed ? document.body.classList.add('sidebar-fixed') : document.body.classList.remove('sidebar-fixed')
      return this.fixed
    },
    handleClick(e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    },
  },
}
</script>

<style lang="css">
.nav-link {
  cursor: pointer;
}
</style>
