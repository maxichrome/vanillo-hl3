<template>
    <a
        @mouseover="emitEvent('hover')"
        @mouseleave.stop="emitEvent('hover-f')"
        @mousedown="emitEvent('down'); emitEvent('press-f')"
        @mouseup="emitEvent('down-f'); emitEvent('press')"
        :class="{ deny }"
    >
        <slot />
    </a>
</template>

<style lang="scss">
a.deny {
    opacity: 0.65;
}
</style>

<script>
export default {
    props: {
        deny: Boolean
    },
    methods: {
        emitEvent(event = '') {
            // console.table({
            //     deny: this.deny,
            //     event
            // })

            if(this.deny && ['press', 'press-f'].includes(event)) {
                event = event.replace('press', 'deny')
            }

            this.$emit('itemevent', event)
        }
    }
}
</script>