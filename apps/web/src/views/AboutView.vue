<script setup lang="ts">
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Book, Code2, ExternalLink, Github, Layers } from "lucide-vue-next";
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col items-center justify-center space-y-4 text-center">
      <h1 class="text-4xl font-bold tracking-tight sm:text-5xl">About</h1>
      <p class="max-w-175 text-lg text-muted-foreground">
        This is a Vue.js template built with modern tooling and best practices.
      </p>
    </div>

    <Separator />

    <div class="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Layers class="h-5 w-5" />
            Project Structure
          </CardTitle>
          <CardDescription>
            Organized and scalable architecture for your applications.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li class="flex items-center gap-2">
              <Badge variant="outline">src/</Badge>
              Main source directory
            </li>
            <li class="flex items-center gap-2">
              <Badge variant="outline">components/</Badge>
              Reusable Vue components
            </li>
            <li class="flex items-center gap-2">
              <Badge variant="outline">views/</Badge>
              Page-level components
            </li>
            <li class="flex items-center gap-2">
              <Badge variant="outline">stores/</Badge>
              Pinia state management
            </li>
            <li class="flex items-center gap-2">
              <Badge variant="outline">router/</Badge>
              Vue Router configuration
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <Code2 class="h-5 w-5" />
            Features
          </CardTitle>
          <CardDescription> Everything you need to build modern web applications. </CardDescription>
        </CardHeader>
        <CardContent>
          <ul class="space-y-2 text-sm text-muted-foreground">
            <li class="flex items-center gap-2">
              <Badge>Vue 3</Badge>
              Composition API with script setup
            </li>
            <li class="flex items-center gap-2">
              <Badge variant="secondary">TypeScript</Badge>
              Full type safety
            </li>
            <li class="flex items-center gap-2">
              <Badge variant="outline">Tailwind CSS</Badge>
              Utility-first styling
            </li>
            <li class="flex items-center gap-2">
              <Badge>shadcn-vue</Badge>
              Beautiful component library
            </li>
            <li class="flex items-center gap-2">
              <Badge variant="secondary">Vitest</Badge>
              Fast unit testing
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>

    <div class="flex justify-center gap-4">
      <Button as-child>
        <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">
          <Book class="mr-2 h-4 w-4" />
          Vue Docs
          <ExternalLink class="ml-2 h-3 w-3" />
        </a>
      </Button>
      <Button variant="outline" as-child>
        <a href="https://www.shadcn-vue.com" target="_blank" rel="noopener noreferrer">
          <ExternalLink class="mr-2 h-4 w-4" />
          shadcn-vue
        </a>
      </Button>
      <Button variant="secondary" as-child>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <Github class="mr-2 h-4 w-4" />
          GitHub
        </a>
      </Button>
    </div>
  </div>
</template>
