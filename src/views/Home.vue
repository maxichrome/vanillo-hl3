<template>
    <div class="home">
        <img alt="Vanillo 3 logo" id="logo" src="../assets/v3-logowwebv.svg" />
        <div class="menu">
            <menu-item @itemevent="emit" @click.native="$emit('openwindow', 'join')">Join Vanillo(?)</menu-item>

            <menu-item
                @itemevent="emit"
                href="https://twitter.com/VanilloPR"
                target="_blank"
            >Twitter</menu-item>

            <menu-item @itemevent="emit" @click.native="$emit('openwindow', 'respects')">
                <span class="key">f</span>
                Pay Respects
            </menu-item>

            <menu-item @itemevent="emit" @click.native="$emit('openwindow', 'options')">Options</menu-item>

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
    text-decoration: none;
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
      },
      gamer() {
          console.log('please work')
      }
  }
}
</script>
