# Project Overview

- Build an interactive horse racing game using **Vue.js 3** with the **Options API** and **mixins**.
- Use **Vuex** for all state management and **Vuetify** for a beautiful, light UI design.
- Demonstrate scalable, maintainable, and clean code structure suitable for large projects.

# Functional Requirements

Generate Horse List: The horse list should contain between 1 to 20 horses, randomly
generated. 3. Generate Race Schedule: Upon clicking the Generate button, a race schedule must be
created consisting of 6 rounds. 4. Start the Race: When the Start button is clicked, the races should begin, running one
round at a time. 5. Display Race Results: The results for each race should appear in the Results field,
shown sequentially as each race concludes. 6. Animated Horse Movement: The horses should visibly move during each race. 7. Coding Style: Please structure your code in a way that demonstrates clean and
maintainable practices, as if for a large-scale project.
Rules and Conditions:

1. The game should have a total of 20 horses available for racing.
2. Each horse should be represented with a unique color.
3. Each horse's condition score should range from 1 to 100.
4. Each race should consist of 6 rounds.
5. For each round, select 10 random horses from the available 20.
6. Round Specifications: The rounds must occur at different lengths in the following
   sequence:
   ○ Round 1: 1200 meters
   ○ Round 2: 1400 meters
   ○ Round 3: 1600 meters
   ○ Round 4: 1800 meters
   ○ Round 5: 2000 meters
   ○ Round 6: 2200 meters

# Technical Requirements

- **Vue 3 Options API**: Use Vue 3 and strictly the Options API for all components. Do not use Composition API unless explicitly required.
- **Mixins**: Share reusable logic using mixins, placed in `src/mixins/` and documented with JSDoc.
- **Vuex Store**: Use Vuex for all game state management (horses, rounds, results, UI state). Store modules in `src/store/`.
- **Vuetify UI**: Use Vuetify for all UI components and styling. Apply a light, modern design theme.
- **Component-Based Design**: Organize UI and logic into focused, reusable Vue single-file components (`.vue`).
- **Animation**: Animate horse movement during races using CSS transitions or JavaScript, ensuring smooth performance.
- **Accessibility**: Ensure interactive elements are accessible (ARIA roles, keyboard navigation).
- **Testing**: Write unit tests for core logic and components using Jest and vue-test-utils. Target 80%+ coverage.
- **Documentation**: Document all components, mixins, and modules with JSDoc. Update README with setup and usage instructions.
- **Linting**: Use ESLint with Vue 3 recommended config. Fix all lint errors before committing.
- **Performance**: Optimize for smooth animation and responsive UI. Use lazy loading for large modules and code splitting.
- **Security**: Sanitize all user input and avoid direct DOM manipulation.

# Coding Style & Best Practices

- Use PascalCase for component names and mixin names, kebab-case for file names.
- Keep components small and focused; avoid monolithic files.
- Use props/events for parent-child communication; avoid excessive Vuex usage for local state.
- Prefer computed properties and watchers for reactive logic.
- Place all methods under the `methods` option; avoid using methods for reactive logic.
- Use async/await for asynchronous code; handle errors gracefully.
- Remove unused code/assets regularly.
- Use environment variables for configuration; never hardcode secrets.
- Ensure cross-browser compatibility.
- Document public APIs, props, events, and complex logic with JSDoc.
- Register global components in `main.js` only if necessary; prefer local registration.
- Avoid direct DOM manipulation; use Vue directives and event handling.
- Ensure accessibility and ARIA compliance in all interactive components.
