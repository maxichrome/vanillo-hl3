<template>
    <div id="app">
        <audio ref="player-hover" src="/sound/buttonrollover.wav"></audio>
        <audio ref="player-down" src="/sound/buttonclick.wav"></audio>
        <audio ref="player-press" src="/sound/buttonclickrelease.wav"></audio>
        <audio ref="player-deny" src="/sound/wpn_denyselect.wav"></audio>

        <div class="background">
            <!-- <youtube
                video-id="t5ewEuu5ILc"
                :player-vars="{
                    controls: 0,
                    autoplay: (+preferences.backgroundAutoplay || 0),
                    start: 0
                }"
                :mute="!!preferences.backgroundMuted || false"
                @ready="playerReady"
                @ended="playBackground"
                ref="bg-player-container"
            ></youtube>-->
            <div class="background-container">
                <img :src="`/background/${bgImage}.jpg`" />
            </div>
        </div>
        <div class="window-container" ref="window-container" @click.self="closeWindow">
            <v-window title="Pay Respects" name="respects" :list="windows" @close="closeWindow">
                <span class="status">
                    You've paid
                    <span class="count">{{ respectsPaid.toLocaleString() }}</span>
                    respect{{ respectsPaid === 1 ? '' : 's' }} to Vanillo.
                </span>
                <button @click="payRespects">Pay Respects (f)</button>

                <template v-slot:buttons>
                    <button @click="closeWindow">Close</button>
                </template>
            </v-window>

            <v-window title="Join Vanillo" name="join" :list="windows" @close="closeWindow">
                <span>We're still working on Vanillo behind the scenes.</span>
                <span>
                    Follow our
                    <a href="https://twitter.com/VanilloPR" target="_blank">Twitter</a> for updates!
                </span>
                <span></span>
                <span>
                    — Team Vanillo
                    <br />❤🍦
                </span>

                <template v-slot:buttons>
                    <button @click="closeWindow">Close</button>
                </template>
            </v-window>

            <v-window title="Options" name="options" :list="windows" @close="closeWindow">
                <section>
                    <span class="title">Media</span>
                    <div>
                        <span class="option">
                            <input type="checkbox" id="play-media" v-model="preferences.playMedia" />
                            <label for="play-media">Play Sound Effects</label>
                        </span>
                        <!-- <span class="option">
                            <input
                                type="checkbox"
                                id="bg-audio"
                                v-model="preferences.backgroundMuted"
                            />
                            <label for="bg-audio">Mute Background Audio</label>
                        </span>
                        <span class="option">
                            <input
                                type="checkbox"
                                id="bg-autoplay"
                                v-model="preferences.backgroundAutoplay"
                            />
                            <label for="bg-autoplay">Autoplay Background</label>
                        </span>
                        <span class="option">
                            <button @click="toggleBackground">Toggle Background Media</button>
                        </span>-->
                    </div>
                </section>
                <section>
                    <span class="title">Info</span>
                    <div class="text">
                        <span>
                            <strong>Copyright &copy; 2019 CosmicMedia LLC.</strong>
                            <br />All rights reserved.
                            <br />
                            <br />Made by
                            <a href="https://hflet.ch" target="_blank">Haden</a>.
                            <br />Inspired by
                            <a
                                href="https://store.steampowered.com/app/220"
                                target="_blank"
                            >Half-Life 2</a>.
                        </span>
                        <span>
                            The
                            <em>Half-Life 2</em> name and the background images used on this site are
                            <strong>copyright &copy; Valve Corporation</strong>.
                            <br />No infringement is intended.
                            <br />
                            <br />If you would like to request a takedown due to content on this site, please
                            <a
                                href="mailto:legal@cosmic.media"
                                target="_blank"
                            >contact us</a>.
                            <br />
                            <br />Thank you.
                        </span>
                    </div>
                </section>

                <template v-slot:buttons>
                    <button @click="savePreferences(); closeWindow()">OK</button>
                    <button @click="reloadPreferences(); closeWindow()">Cancel</button>
                </template>
            </v-window>
        </div>
        <div class="content">
            <router-view class="container" @itemevent.capture="play" @openwindow="openWindow" />
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
    font-family: Arial, sans-serif;
    font-weight: 700;
    user-select: none;
}

#app {
    display: flex;
    height: 100%;
    width: 100%;
    font-size: 1.25rem;

    > .content {
        position: absolute;
        display: flex;
        margin: auto 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 20;

        > .container {
            display: flex;
            flex-direction: column;
            margin: auto 0;
            width: auto;
            padding-left: 10vw;
        }
    }

    > .background {
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 10;
        position: absolute;
        overflow: hidden;

        > div {
            height: 100%;
            width: 100%;
            position: relative;

            > img {
                position: absolute;
                margin: auto;
                width: auto;
                height: auto;
                min-width: 100%;
                min-height: 100%;
                top: -9999px;
                right: -9999px;
                left: -9999px;
                bottom: -9999px;
            }
        }
    }

    > .window-container {
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
}

#window-respects {
    text-align: center;

    .status {
        height: 5rem;
        margin-top: 2rem;
    }

    .count {
        font-size: 1.75rem;
        color: #888;
        font-weight: 400;
        font-variant-numeric: tabular-nums;
    }

    button {
        width: 50%;
        margin: 0 auto;
        padding: 0.5rem;
    }
}

#window-join {
    span {
        font-size: 1.15em;
        font-weight: 500;

        &:not(:last-of-type) {
            margin-bottom: 0.75em;
        }
    }
}

#window-options {
    font-weight: 400;

    section {
        border: solid 1px #909090;
        border-radius: 3px;
        font-size: 0.65em;

        &:not(:first-of-type) {
            margin-top: 1.25rem;
        }

        .title {
            display: inline-block;
            font-weight: 600;
            font-size: 1.125em;
            position: relative;
            margin: 0;
            padding: 0 0.25em;
            top: -0.5em;
            left: 0.25em;
            text-shadow: 0 0 5px rgb(200, 200, 200);
            background: rgb(200, 200, 200);
        }

        > div {
            padding: 0.5em;
            padding-top: 0;
            padding-bottom: 0.75em;

            display: grid;
            grid-template-columns: repeat(2, 1fr);
            column-gap: 0.25em;
            row-gap: 0.15em;

            &.text {
                column-gap: 2em;
                row-gap: 1em;
            }
        }

        span.option {
            display: flex;
            flex-direction: row;
            align-items: center;
        }

        input[type="checkbox"] {
            border-style: inset;
        }

        label,
        button {
            letter-spacing: 0.05ch;
            font-weight: 500;
            margin-left: 0.25em;
        }
    }
}

audio {
    display: none;
}

a {
    color: inherit;
    text-decoration: underline;
    transform: scale(1, 0.9);

    &:hover {
        opacity: 0.8;
    }

    &:focus {
        opacity: 0.8;
    }

    &:active {
        opacity: 0.9;
    }
}
</style>

<script>
import { setInterval, clearInterval } from 'timers';

function payRespects(_component = {}) {
    console.info('paying respects...')

    _component.respectsPaid += 1
    _component.play('press-f')
    _component.play('press')
}

export default {
    created() {
        console.log('APP created')
        window.addEventListener('keyup', this.keyListener.bind(this))
        window.addEventListener('click', this.clickListener.bind(this))

        this.loadRespectCount()

        this.respectsTimer = setInterval(function() {
            this.saveRespectCount()
        }.bind(this), 5000)

        console.log('refs', this.$refs)

        this.reloadPreferences()
    },
    beforeDestroy() {
        console.log('APP destroying')
        window.removeEventListener('keyup', this.keyListener)
        window.removeEventListener('click', this.clickListener)

        clearInterval(this.respectsTimer)
    },
    components: {
        VWindow: () => import('./Window')
    },
    data() {
        return {
            respectsPaid: 0,
            windows: {},
            preferences: {
                playMedia: false,
                backgroundMuted: true,
                backgroundAutoplay: false
            },
            bgPlayer: null,
            respectsTimer: null,
            bgImage: Math.ceil(Math.random() * 5)
        }
    },
    methods: {
        frick() {
            console.debug('gaming')
        },
        play(event = '') {
            if(this.preferences.playMedia !== true)
                return;

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
                console.debug('no element found for', event, '| falling-edge:', falling)
                return
            }
        },
        keyListener(event) {
            this.firstInteraction()

            if(event.key === 'f') {
                this.openWindow('respects')
                payRespects(this)
            } else if(event.key === 'Escape') {
                this.closeWindow()
            }
        },
        clickListener() {
            this.firstInteraction()
        },
        firstInteraction() {
            if(!localStorage.getItem('prefs')) {
                this.preferences.playMedia = true
                this.preferences.backgroundAutoplay = true
                this.savePreferences()
            }
        },
        savePreferences() {
            console.info('saving preferences', this.preferences)
            localStorage.setItem('prefs', JSON.stringify(this.preferences))
        },
        reloadPreferences() {
            console.info('loading prefs')

            if(localStorage.getItem('prefs')) {
                const newPreferences = Object.assign({}, this.preferences, JSON.parse(localStorage.getItem('prefs')))
                for(const key in newPreferences) {
                    this.preferences[key] = newPreferences[key]
                }
            }

            console.info('prefs loaded')
        },
        saveRespectCount() {
            localStorage.setItem('respects', this.respectsPaid)
            console.log('saved respects')
        },
        loadRespectCount() {
            if(localStorage.getItem('respects'))
                this.respectsPaid = +localStorage.getItem('respects')

            console.log('loaded respects:', this.respectsPaid)
        },
        playerReady(event) {
            this.bgPlayer = event.target
        },
        toggleBackground() {
            if(this.bgPlayer) {
                const state = this.bgPlayer.getPlayerState()

                if(state === 5)
                    this.playBackground()
                else
                    this.stopBackground()
            }
        },
        playBackground() {
            if(this.bgPlayer)
                this.bgPlayer.playVideo()
        },
        stopBackground() {
            if(this.bgPlayer)
                this.bgPlayer.stopVideo()
        },
        payRespects() {
            return payRespects(this)
        },
        openWindow(window = '') {
            if(this.windows[window]) {
                this.windows[window].open()
            } else {
                console.error('window does not exist:', window)
            }
        },
        closeWindow() {
            for(const window in this.windows) {
                this.windows[window].close()
            }
        },
        reload() {
            window.location.reload()
        }
    }
}
</script>
