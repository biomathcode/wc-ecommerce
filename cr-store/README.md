## Creating E-commerce store using web-component and lit-element library


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






### Fetching data from fakestoreapi.com


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



```js
fetch('https://fakestoreapi.com/products/1')
            .then(res=>res.json())
            .then(json=>console.log(json))
```



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