<template>
  <div class="c-app">
    <TheSidebar />
    <Ambiente></Ambiente>
    <div class="c-wrapper">
      <TheHeader />
      <transition name="fade-in-down">
        <nuxt />
      </transition>
      <TheFooter />
    </div>
  </div>
</template>

<script>
import TheSidebar from './default/TheSidebar'
import TheHeader from './default/TheHeader'
import TheFooter from './default/TheFooter'
import Ambiente from './default/Ambiente'

export default {
  name: 'Full',
  components: {
    TheSidebar,
    TheHeader,
    TheFooter,
    Ambiente,
  },
  middleware: ['autentificado'],
  scrollToTop: true,
  mounted() {
    this.classBody()
    if (process.env.NODE_ENV === 'production') {
      this.OneSignal()
    }
    /*
    this.$echo.channel('notificaciones').listen('OrderShipped', (e) => {
      console.log(e)
    }) */
  },
  methods: {
    classBody() {
      const body = document.body
      body.removeAttribute('class')
    },
    OneSignal() {
      this.$OneSignal.push(() => {
        this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
          if (isEnabled) {
            //  console.log('Las notificaciones push están habilitadas!')
          } else {
            //  console.log('Las notificaciones push aún no están habilitadas.')
          }
        })
      })
      this.$OneSignal.push([
        'addListenerForNotificationOpened',
        (data) => {
          console.log('Received NotificationOpened:', data)
        },
      ])
      this.$OneSignal.push([
        'getNotificationPermission',
        function (permission) {
          console.log('Site Notification Permission:', permission)
          // (Output) Site Notification Permission: default
        },
      ])
    },
  },
}
</script>
