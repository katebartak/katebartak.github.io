---
applyTo: "**"
---

Provide project context and coding guidelines that AI should follow when generating code, answering questions, or reviewing changes.

---

## applyTo: '\*\*'

# Building a Vue 3 Application (Options API)

- Use **Vue 3** as the framework, but strictly use the **Options API** for all components. Do not use the Composition API unless explicitly requested.
- Scaffold the project with the official Vue CLI (`@vue/cli`) or Vite (with Vue 3 preset).
- Organize source files under `src/` with clear separation: `components/`, `views/`, `assets/`, `router/`, `store/`.
- Use single-file components (`.vue`) for all UI elements. Each component must have `<template>`, `<script>`, and `<style>` sections.
- Prefer SCSS or SASS for styling if pre-processors are needed. Otherwise, use standard CSS.
- Use Vue Router for navigation. Define routes in `src/router/index.js`.
- Use **Vuex only** for state management. Do not use Pinia. Store modules should be in `src/store/`.
- Register global components in `main.js` only if necessary. Prefer local registration for most components.
- Always lint code with ESLint (use the Vue recommended config for Vue 3). Fix all lint errors before committing.
- Write unit tests for components using Jest and vue-test-utils. Target at least 80% coverage.
- Document all components with JSDoc comments and provide README instructions for setup and usage.
- Ensure accessibility (ARIA roles, keyboard navigation) in all interactive components.
- Optimize performance by lazy-loading routes and splitting vendor chunks.
- Secure the app by sanitizing user input and avoiding direct DOM manipulation.

# Options API Best Practices

- Use the `export default {}` syntax for all components.
- Define component options in the following order: `name`, `components`, `props`, `data`, `computed`, `watch`, `methods`, `mounted`, `created`, `other lifecycle hooks`.
- Use PascalCase for component names and kebab-case for file names.
- Always define `name` property for each component.
- Use `props` for parent-child communication; validate props with type and default values.
- Use `data` as a function returning an object for local state.
- Prefer `computed` properties for derived state and reactive logic.
- Use `watch` for side effects and reacting to data changes.
- Place all methods under the `methods` option; avoid using methods for reactive logic.
- Use lifecycle hooks (`mounted`, `created`, etc.) for initialization and cleanup.
- Avoid using `this.$refs` for direct DOM manipulation; prefer Vue directives and event handling.
- Use `emits` option to declare emitted events (Vue 3 feature).
- Use `v-model` for two-way binding, and declare the `modelValue` prop and `update:modelValue` event for custom components.
- Avoid mixing Options API and Composition API in the same component.
- Use TypeScript for type safety if possible; otherwise, use JSDoc for type annotations.
- Document all props, events, and public methods with JSDoc.
- Keep components small and focused; split large components into smaller ones.
- Remove unused code, assets, and dependencies regularly.

# General Best Practices

- Use clear, descriptive names for components, files, and variables.
- Use props and events for parent-child communication; avoid excessive use of Vuex/Pinia for local state.
- Always validate and sanitize user input before processing or rendering.
- Avoid direct DOM manipulation; use Vue directives and lifecycle hooks.
- Prefer computed properties and watchers over methods for reactive logic.
- Use async/await for asynchronous code; handle errors gracefully with try/catch.
- Use environment variables for configuration and secrets; never hardcode sensitive data.
- Review and update dependencies to address security vulnerabilities.
- Ensure cross-browser compatibility and test on multiple devices.
- Use code splitting and lazy loading for large modules and third-party libraries.
- Document all public APIs and complex logic with JSDoc comments.

# Mixins

- Use mixins to share reusable logic across multiple components, such as common methods, computed properties, or lifecycle hooks.
- Place mixin files in a dedicated `src/mixins/` directory.
- Name mixin files in kebab-case (e.g., `form-validation.mixin.js`).
- Document each mixin with JSDoc, describing its purpose and usage.
- Avoid excessive use of mixins; prefer composition only for logic that is truly shared and not better suited for a utility module or higher-order component.
- When using mixins, be mindful of property/method name collisions and document expected component integration clearly.
