<template>
    <div id="app">
        <audio ref="player-hover" src="/sound/buttonrollover.wav"></audio>
        <audio ref="player-down" src="/sound/buttonclick.wav"></audio>
        <audio ref="player-press" src="/sound/buttonclickrelease.wav"></audio>
        <audio ref="player-deny" src="/sound/wpn_denyselect.wav"></audio>

        <!-- <audio ref="ambient-base" src="/sound/ambience_base.wav" autoplay loop></audio> -->
        <!-- <audio ref="ambient-plaza" src="/sound/plaza_amb.wav" autoplay loop></audio> -->

        <div class="background">
            <iframe
                src="https://www.youtube-nocookie.com/embed/t5ewEuu5ILc?controls=0&autoplay=1&loop=1"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe>
        </div>
        <div class="content">
            <router-view class="container" @itemevent.capture="play" />
        </div>
    </div>
</template>

<style lang="scss">
html,
body {
    margin: 0;
    color: #fda;
    display: flex;
    width: 100%;
    height: 100%;
    font-family: sans-serif;
    font-weight: 700;
}

#app {
    display: flex;
    height: 100%;
    width: 100%;
    font-size: 1.25rem;
}

#app > .content {
    position: absolute;
    display: flex;
    margin: auto 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 20;
}

#app > .content > .container {
    display: flex;
    flex-direction: column;
    margin: auto 0;
    width: auto;
    padding-left: 10rem;
}

#app > .background {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 10;
}

#app > .background iframe {
    width: 100%;
    height: 100%;
    display: flex;
}

audio {
    display: none;
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
    created() {
        console.log('APP created')
        window.addEventListener('keydown', this.keyListener)
    },
    beforeDestroy() {
        console.log('APP destroying')
        window.removeEventListener('keydown', this.keyListener)
    },
    data: function() {
        return {
            keyListener: (event) => {
                if(event.key === 'f') {
                    console.log('time to pay some respects')
                }
            }
        }
    },
    methods: {
        frick() {
            console.log('gaming')
        },
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
