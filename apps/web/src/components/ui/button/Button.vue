<script setup lang="ts">
import { Primitive, type PrimitiveProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { buttonVariants, type ButtonVariants } from ".";

interface Props extends PrimitiveProps {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "button",
  variant: "default",
  size: "default",
});
</script>

<template>
  <Primitive
    :as="props.as"
    :as-child="props.asChild"
    :class="buttonVariants({ variant: props.variant, size: props.size, class: props.class })"
  >
    <slot />
  </Primitive>
</template>
