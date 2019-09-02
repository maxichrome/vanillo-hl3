<template>
    <div class="window">
        <div class="titlebar">
            <span class="title" v-text="title" />
            <button class="close" @click="$emit('close')"></button>
        </div>
        <div class="content" :id="'window-' + name">
            <slot />
        </div>
        <div class="buttons">
            <slot name="buttons" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.window {
    background: rgb(200, 200, 200);
    opacity: 0.9;
    display: none;
    color: #666;
    flex-direction: column;
    margin: auto;
    width: 35rem;
    height: 20rem;
    border-style: outset;
    border-radius: 0.45rem;
    text-rendering: optimizeSpeed;

    &.open {
        display: flex;
    }

    > .titlebar {
        padding: 0.5rem;
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
            display: flex;
            justify-content: center;
            align-items: center;

            &:before {
                content: "✖";
            }
        }
    }

    > .content {
        height: 100%;
        overflow-y: scroll;
        padding: 1rem;
        display: flex;
        flex-direction: column;
        margin: 0 0.5rem;
        border-style: outset;
        border-width: 2px;
    }

    > .buttons {
        padding: 0.5rem;
        display: flex;

        & button:first-of-type {
            margin-left: auto;
        }
    }

    button {
        border-style: outset;
        appearance: none;
        color: inherit;
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
    }
}
</style>

<script>
export default {
    props: {
        name: String,
        title: String,
        list: Object
    },
    data() {
        return {
            isOpen: false
        }
    },
    methods: {
        open() {
            if(this.$el.classList.contains('open'))
                return;

            console.log('opening window:', this.name)

            for(const windowName in this.list) {
                // close all other open windows
                const window = this.list[windowName]

                if(window && window.name !== this.name && window.isOpen)
                    window.close()
            }

            this.$el.classList.add('open')
            this.$el.parentElement.classList.add('open')

            this.isOpen = true
        },
        close() {
            if(!this.isOpen)
                return;

            console.log('closing window:', this.name)

            if(this.$el.classList.contains('open')) {
                this.$el.classList.remove('open')
            }

            this.$el.parentElement.classList.remove('open')

            this.isOpen = false
        }
    },
    created() {
        this.list[this.name] = this
    },
    beforeDestroy() {
        delete this.list[this.name]
    },
    updated() {
        this.list[this.name] = this
    },
    beforeUpdate() {
        delete this.list[this.name]
    }
}
</script>
