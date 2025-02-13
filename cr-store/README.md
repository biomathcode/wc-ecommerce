## Creating E-commerce store using web-component and lit-element library


#### Pre-requisites

Hands on knowledge of Html, css, and javascript. A bit of experience creating web component, and using libraries like lit-element to create web components.




### Initial setup

intialise the project using open-wc

```bash
npm init @open-wc
```

The cli will ask you some questions, you can choose the 

- Scaffold a new Project
- Application

Then you can choose 

- Linting -> ESLint
- Testing -> Web Test Runner
- Demoing -> Using Storybook
- Building -> Using Rollup


My Response to the questions

```bash 
Note: you can exit any time with Ctrl+C or Esc
✔ What would you like to do today? › Scaffold a new project
✔ What would you like to scaffold? › Application
✔ What would you like to add? › Linting (eslint & prettier), Testing (web-test-runner), Demoing (storybook), Building (rollup)
✔ Would you like to use typescript? › Yes
? What is the tag name of your app shell element? › cr-store
```

Give a detailed explaination of the project structure


```bash
|-- cr-store                                  
  |-- .editorconfig
  |-- .gitignore
  |-- LICENSE
  |-- README.md
  |-- custom-elements.json
  |-- index.html
  |-- package.json
  |-- pnpm-lock.yaml
  |-- rollup.config.js
  |-- tsconfig.json
  |-- web-dev-server.config.js
  |-- web-test-runner.config.js
  |-- .storybook
    |-- main.js
  |-- .husky
    |-- pre-commit
  |-- .vscode
    |-- extensions.json
  |-- assets
    |-- open-wc-logo.svg
  |-- src
    |-- cr-badge.ts
    |-- cr-button.ts
    |-- cr-card.ts
    |-- cr-rating.ts
    |-- cr-search.ts
    |-- cr-skeleton.ts
    |-- cr-store.ts
  |-- stories
    |-- cr-store.stories.ts
  |-- test
    |-- cr-store.test.ts
  |-- out-tsc
    |-- tsconfig.tsbuildinfo
    |-- src
      |-- cr-badge.js
      |-- cr-badge.js.map
      |-- cr-button.js
      |-- cr-button.js.map
      |-- cr-card.js
      |-- cr-card.js.map
      |-- cr-cart.js
      |-- cr-cart.js.map
      |-- cr-rating.js
      |-- cr-rating.js.map
      |-- cr-search.js
      |-- cr-search.js.map
      |-- cr-skeleton.js
      |-- cr-skeleton.js.map
      |-- cr-store.js
      |-- cr-store.js.map
    |-- stories
      |-- cr-store.stories.js
      |-- cr-store.stories.js.map
    |-- test
      |-- cr-store.test.js
      |-- cr-store.test.js.map
```

 



### Fetching data from fakestoreapi.com


```js
fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
            .then(json=>console.log(json))
```

here we will call the fetchData method in connectedCallback lifecycle method because it is called when the element is added to the DOM. 

```ts
 async fetchData() {

    try {
      const r = await fetch(`https://fakestoreapi.com/products`)

      if (!r.ok) {
        throw new Error(`API Error: ${r.status}`)
        }
      const data = await r.json(); // Store parsed response once
      this.thing = data
      this.products = data;
    } catch (e) {
      this.error = e as string
    }
    this.fetching = false


  }

```


Why we are using properties to store the data?

- Properties are reactive, when the value of a property changes, the component will re-render
- Properties are serializable, they can be stored in the DOM, and can be passed to other components as props
- Properties are type-checked, you can define the type of a property, and the component will throw an error if you try to assign a value of a different type

### Difference between properties and attributes

- Properties are used to store data in the component, and are reactive
- Attributes are used to pass data to the component from the outside, and are not reactive
- Properties are camelCase, attributes are kebab-case
- Attributes are defined by HTML. Properties are defined by the DOM (Document Object Model).



### Difference between properties and state
Key Differences Summarized
| Feature               | Properties              | State                          |
| --------------------- | ----------------------- | ------------------------------ |
| Visibility            | Public API              | Internal                       |
| Reflection            | Reflected as attributes | Not reflected                  |
| Purpose               | Input, configuration    | Internal data management       |
| External Manipulation | Can be set from outside | Should not be set from outside |
  



### Creating a product-card component

```ts
import { LitElement, html, css, property } from 'lit-element';






<p align="center">
  <img width="200" src="https://open-wc.org/hero.png"></img>
</p>

## Open-wc Starter App

[![Built with open-wc recommendations](https://img.shields.io/badge/built%20with-open--wc-blue.svg)](https://github.com/open-wc)

## Quickstart

To get started:

```sh
npm init @open-wc
# requires node 10 & npm 6 or higher
```

## Scripts

- `start` runs your app for development, reloading on file changes
- `start:build` runs your app after it has been built using the build command
- `build` builds your app and outputs it in your `dist` directory
- `test` runs your test suite with Web Test Runner
- `lint` runs the linter for your project

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.