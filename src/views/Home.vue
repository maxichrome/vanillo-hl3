<template>
    <div class="home">
        <img alt="Vanillo 3 logo" id="logo" src="../assets/v3-logowwebv.svg" />
        <div class="menu">
            <menu-item @itemevent="emit">Join Us</menu-item>

            <menu-item @itemevent="emit">Join Us (but again)</menu-item>

            <menu-item @itemevent="emit">
                <span class="key">f</span>
                Pay Respects
            </menu-item>

            <menu-item @itemevent="emit" :deny="true">Options</menu-item>

            <menu-item @itemevent="emit" :deny="true">Quit Game</menu-item>
        </div>
    </div>
</template>

<style lang="scss">
.home {
}

#logo {
    height: 5rem;
    margin-bottom: 2rem;
}

.menu .key {
    text-transform: capitalize;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #eee;
    color: #333;
    border-radius: 0.25rem;
    border-style: solid;
    border-color: #999;
    border-width: 0;
    border-bottom-width: 0.2em;
    width: 2rem;
    height: 2rem;
}

.menu {
    display: flex;
    flex-direction: column;
}

.menu a {
    margin: 0.5em 0;
}
</style>

<script>
export default {
  name: 'home',
  components: {
      MenuItem: () => import('../components/MenuItem')
  },
  methods: {
      emit(event) {
          this.$emit('itemevent', event)
      }
  }
}
</script>
