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
        <div class="window-container" ref="window-container">
            <div class="window" ref="window--respect">
                <div class="titlebar">
                    <span class="title">Pay Respects</span>
                    <button class="close" @click="closeWindow"></button>
                </div>
                <div class="content">
                    <span class="status">
                        You've paid
                        <span class="count">{{ respectsPaid }}</span>
                        respect{{ respectsPaid === 1 ? '' : 's' }} to Vanillo.
                    </span>
                    <button @click="payRespects">Add Respect</button>
                </div>
                <div class="buttons">
                    <button @click="closeWindow">Close</button>
                </div>
            </div>
        </div>
        <div class="content">
            <router-view
                class="container"
                @itemevent.capture="play"
                @openwindow="payRespects"
                :respects="respectsPaid"
            />
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

#app > .window-container {
    position: absolute;
    display: none;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 50;

    &.open {
        display: flex;
    }
}

.window {
    background: rgba(200, 200, 200, 0.9);
    display: none;
    color: #666;
    flex-direction: column;
    margin: auto;
    height: 20rem;
    width: auto;
    min-width: 35rem;
    max-height: 20rem;
    border-style: outset;
    border-radius: 0.45rem;

    &.open {
        display: flex;
    }
}

.window > .titlebar {
    padding: 0.5rem;
    border-bottom: 1px solid rgba(200, 200, 200, 0.85);
    display: flex;
    flex-direction: row;

    > .title {
        font-size: 0.75em;
        font-weight: 700;
    }

    > button.close {
        border-style: none;
        margin-left: auto;
        width: 1.25rem;
        height: 1.25rem;
        // background: #f00;
        line-height: 0;
        color: inherit;
        ldisplay: flex;
        justify-content: center;
        align-items: center;

        &:before {
            content: "✖";
        }
    }
}

.window > .content {
    height: 100%;
    overflow-y: scroll;
}

.window > .buttons {
    padding: 0.5rem;
    border-top: 1px solid rgba(200, 200, 200, 0.85);
    display: flex;
}

.window button {
    border-style: outset;
    appearance: none;
    color: #fff;
    padding: 0.25rem 0.5rem;
    background: none;
    font-family: inherit;
    font-weight: inherit;

    &:active {
        border-style: inset;
    }

    &:focus {
        outline: none;
    }

    &:not(:first-of-type) {
        margin-left: 0.25rem;
    }

    &:first-of-type {
        margin-left: auto;
    }
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
function payRespects(_component = {}) {
    _component.respectsPaid += 1
}

export default {
    created() {
        console.log('APP created')
        window.addEventListener('keydown', this.keyListener.bind(this))
    },
    beforeDestroy() {
        console.log('APP destroying')
        window.removeEventListener('keydown', this.keyListener.bind(this))
    },
    data() {
        return {
            keyListener(event) {
                if(event.key === 'f') {
                    payRespects(this)
                }
            },
            respectsPaid: 0
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
        },
        payRespects() {
            return payRespects(this)
        },
        openWindow(window = '') {
            console.log(
                'gaming'
            )

            if(this.$refs['window--' + window]) {
                this.$refs['window--' + window].classList.add('open')
                this.$refs['window-container'].classList.add('open')
            } else {
                console.error('window does not exist:', window)
            }
        },
        closeWindow() {
            for(const refName in this.$refs) {
                if(refName.startsWith('window--')){
                    const ref = this.$refs[refName]
                    ref.classList.remove('open')
                }
            }

            this.$refs['window-container'].classList.remove('open')
        }
    }
}
</script>
