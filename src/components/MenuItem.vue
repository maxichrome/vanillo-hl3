<template>
    <a @mouseover="$emit('hover')" @mouseleave.stop="$emit('hover-f')">
        <slot />
    </a>
</template>

<script>
export default {
    methods: {
        
    }
}
</script>