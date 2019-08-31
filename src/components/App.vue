<template>
    <div id="app">
        <audio ref="player-hover" src="/sound/buttonrollover.wav"></audio>
        <audio ref="player-down" src="/sound/buttonclick.wav"></audio>
        <audio ref="player-press" src="/sound/buttonclickrelease.wav"></audio>
        <router-view class="container" @itemevent.capture="play" />
    </div>
</template>

<style lang="scss">
html,
body {
    margin: 0;
    background-color: #333;
    color: #fda;
    display: flex;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    font-weight: 700;
}

#app {
    display: flex;
    margin-left: 10rem;
    height: 100%;
    font-size: 1.25rem;
}

#app > .container {
    display: flex;
    flex-direction: column;
    margin: auto 0;
    height: auto;
}

a {
    color: inherit;
    text-decoration: none;
    transform: scale(1, 0.9);
    cursor: default;
}

a:hover {
    opacity: 0.8;
}

a:focus {
    opacity: 0.8;
}

a:active {
    opacity: 0.9;
}
</style>

<script>
export default {
    methods: {
        play(event = '') {
            let falling = false

            if(event.endsWith('-f')) {
                falling = true
                event = event.slice(0, -2)
            }

            const ref = this.$refs['player-' + event.toLowerCase()]
            if(ref) {
                if(!falling)
                    ref.play()
                else {
                    if(!ref.paused)
                        ref.pause()
                    ref.currentTime = 0
                }
            } else {
                console.log('no element found for', event, '| falling:', falling)
                return
            }
        }
    }
}
</script>
