<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { badgeVariants, type BadgeVariants } from ".";

const props = defineProps<{
  variant?: BadgeVariants["variant"];
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div :class="badgeVariants({ variant, class: props.class })">
    <slot />
  </div>
</template>
