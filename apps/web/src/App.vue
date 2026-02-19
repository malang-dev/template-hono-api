<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, Info } from "lucide-vue-next";
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="min-h-screen bg-background">
    <header
      class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60"
    >
      <div class="container flex h-14 items-center">
        <RouterLink to="/" class="mr-6 flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span class="font-bold">Vue App</span>
        </RouterLink>
        <nav class="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div class="flex items-center space-x-1">
            <RouterLink to="/" custom v-slot="{ isActive, href, navigate }">
              <Button :variant="isActive ? 'secondary' : 'ghost'" as-child>
                <a :href="href" @click="navigate">
                  <Home class="mr-2 h-4 w-4" />
                  Home
                </a>
              </Button>
            </RouterLink>
            <RouterLink to="/about" custom v-slot="{ isActive, href, navigate }">
              <Button :variant="isActive ? 'secondary' : 'ghost'" as-child>
                <a :href="href" @click="navigate">
                  <Info class="mr-2 h-4 w-4" />
                  About
                </a>
              </Button>
            </RouterLink>
          </div>
        </nav>
      </div>
    </header>
    <Separator />
    <main class="container py-6">
      <RouterView />
    </main>
  </div>
</template>
