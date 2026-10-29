# React + Vite

## Updating project details

Project details are loaded from the public [projects.json Gist](https://gist.github.com/karan2399/a07ac9de0c84ef94a10c52da301fe727) when the portfolio opens. Edit that Gist to update project text, links, tags, and other details; those changes do not require rebuilding or redeploying this site.

Keep the file named `projects.json` and make sure it remains a **public** Gist containing valid JSON: an array of project objects. Each project needs `slug`, `title`, `description`, `image`, `screenshots`, `tags`, `highlights`, `overview`, `role`, `demoCredentials`, `liveDemoUrl`, and `github` fields. `screenshots` is an array of objects with `src`, `alt`, and `caption`; `demoCredentials` needs `email`, `password`, and `note`. Use double quotes around JSON keys and strings, and do not leave trailing commas.

Image paths such as `/images/inquiry-desk-1.png` refer to files already included with the deployed site. Adding or replacing local images still requires a site deployment; use publicly hosted `https://` image URLs in the Gist to change images without one. Everything in the public Gist is visible to anyone. The `demoCredentials` fields are displayed on the site, so use only safe demo-account details there; never include private information, API keys, or real passwords.

## Updating small projects and experiments

Small projects and experiments are loaded from the public [experiments.json Gist](https://gist.github.com/karan2399/d7384d30ea7ed5ec6cc24bc1b7e784e9). Edit that Gist to update the list without rebuilding or redeploying the site. Keep it as a JSON array of objects with `slug`, `name`, `description`, `technologies` (an array of strings), `deployedUrl`, and `githubUrl`. Leave either URL as an empty string if it is not available; its link will not be shown. Everything in the public Gist is visible to anyone.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
