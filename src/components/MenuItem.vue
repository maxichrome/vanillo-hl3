<template>
    <a
        @mouseover="emitEvent('hover')"
        @mouseleave.stop="emitEvent('hover-f')"
        @mousedown="emitEvent('down'); emitEvent('press-f')"
        @mouseup="emitEvent('down-f'); emitEvent('press')"
    >
        <slot />
    </a>
</template>

<script>
export default {
    props: {
        deny: Boolean
    },
    methods: {
        emitEvent(event = '') {
            console.table({
                deny: this.deny,
                event
            })

            if(this.deny && ['press', 'press-f'].includes(event)) {
                event = event.replace('press', 'deny')
            }

            this.$emit('itemevent', event)
        }
    }
}
</script>