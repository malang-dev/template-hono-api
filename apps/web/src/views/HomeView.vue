<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCounterStore } from "@/stores/counter";
import { Minus, Plus, RotateCcw, Zap } from "lucide-vue-next";

const counter = useCounterStore();
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col items-center justify-center space-y-4 text-center">
      <Badge variant="secondary">
        <Zap class="mr-1 h-3 w-3" />
        Vue.js + shadcn-vue
      </Badge>
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Welcome to Vue App</h1>
      <p class="max-w-175 text-lg text-muted-foreground">
        A modern Vue.js template with Vue Router, Pinia, and shadcn-vue for beautiful, accessible UI
        components.
      </p>
    </div>

    <Separator />

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Counter Demo</CardTitle>
          <CardDescription> Test Pinia state management with a simple counter. </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-center space-x-4">
            <Button variant="outline" size="icon" @click="counter.decrement">
              <Minus class="h-4 w-4" />
            </Button>
            <span class="text-4xl font-bold tabular-nums">{{ counter.count }}</span>
            <Button variant="outline" size="icon" @click="counter.increment">
              <Plus class="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
        <CardFooter class="justify-center">
          <Button variant="ghost" @click="counter.reset">
            <RotateCcw class="mr-2 h-4 w-4" />
            Reset
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Double Count</CardTitle>
          <CardDescription> Computed property demonstration from Pinia store. </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex items-center justify-center">
            <span class="text-4xl font-bold tabular-nums text-primary">
              {{ counter.doubleCount }}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tech Stack</CardTitle>
          <CardDescription> Built with modern tools and best practices. </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="flex flex-wrap gap-2">
            <Badge>Vue 3</Badge>
            <Badge variant="secondary">TypeScript</Badge>
            <Badge variant="outline">Vite</Badge>
            <Badge>Pinia</Badge>
            <Badge variant="secondary">Vue Router</Badge>
            <Badge variant="outline">shadcn-vue</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
