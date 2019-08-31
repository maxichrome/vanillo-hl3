<template>
    <a
        @mouseover="$emit('itemevent', 'hover')"
        @mouseleave.stop="$emit('itemevent', 'hover-f')"
        @mousedown="$emit('itemevent', 'down'); $emit('itemevent', 'press-f')"
        @mouseup="$emit('itemevent', 'down-f'); $emit('itemevent', 'press')"
    >
        <slot />
    </a>
</template>

<script>
export default {
    methods: {

    }
}
</script>