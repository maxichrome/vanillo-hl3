<template>
    <div class="home">
        <img alt="Vanillo 3 logo" id="logo" src="../assets/v3-logowwebv.svg" />
        <div class="menu">
            <a>Join Us</a>

            <a @mouseover="emit('hover')" @mouseleave.stop="emit('hover-f')">Join Us (but again)</a>

            <a @mouseover="emit('hover')" @mouseleave.stop="emit('hover-f')">
                <span class="key">f</span> Pay Respects
            </a>

            <a @mouseover="emit('hover')" @mouseleave.stop="emit('hover-f')">Options</a>

            <a @mouseover="emit('hover')" @mouseleave.stop="emit('hover-f')">Quit Game</a>
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
      
  },
  methods: {
      emit(event) {
          this.$emit('item-' + event)
      }
  }
}
</script>
