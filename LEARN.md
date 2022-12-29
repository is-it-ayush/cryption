### Hey!

I know, you have question's on how I built this. Well, I'm here to answer them! I'll try to explain everything as best as I can. This is an npm package. It's a package you can install in your project if you want to use it. Now, let's get started!

## How to install

First, you need to install the package. You can do this by running the following command in your terminal:

```bash
npm install @is-it-ayush/cryption
# or
yarn add @is-it-ayush/cryption
```

## How to use

Now, you have installed the package. Now, you need to import it in your project. You can do this by running the following command in your terminal:

```js
const cryption = require("@is-it-ayush/cryption");
# or
import cryption from "@is-it-ayush/cryption";
```

You can name it whatever you want. I named it `cryption` for this example. Now, you can use it in your project. You will now be able to use the functions in the package. I'll write a guide on how to use the functions in the package soon. For now, the only documentation available is the `auto-complete`  and `tests`. Please check them in-case you need help or [tweet](https://twitter.com/is_it_ayush) me. I'll try to make a better documentation soon.

### How to build your own.

> I'll teach you javascript way. You can use typescript if you want to. It'll all work the same but with the holy grail of added typesafety which is awesome! : )

It's just an npm-package. So to build one, Create an empty folder. Open your terminal and navigate to the folder. You can do this by running the following command in your terminal:

```bash
mkdir my-first-package
cd my-first-package
```
Yay! You need to have a `package.json` file. You can create one by running the following command in your terminal:
```bash
npm init
# or
yarn init
```

Make sure to fill in the details. Now, you need to create a `index.js` file. This is the file that will be imported in your project. You can create one by running the following command in your terminal:

```bash
touch index.js
# or
echo "" > index.js # if you are on windows
```

Now inside your index.js file, you can write the code for your package. You can also create a `src` folder and put all your code in there. In my project. I've used the `/core` folder for all the code.
A `/helpers` folder for the utility functions I would need. A `/tests` folder for the tests and finally an `index.ts` for the main file whose purpose is to bring everything together. : ) 

To create a really quick package. You can copy this below code and paste it in your `index.js` file. This is the code for the `hello-world` package. You can use it as a template for your package.

```js

const helloWorld = () => {
  console.log("Hello World!");
};

module.exports = {
    helloWorld,
};
```

Now, you need to add the `main` property in your `package.json` file. This is the file that will be imported in your project. Open your package.json file and add the following line or change the existing one.

```json
"main": "index.js"
```

Before you publish, you need to

- Add a `README.md` file. This is the file that will be shown on the npm website. 
- Add a `LICENSE` file. This is the file that will be shown on the npm website.
- Make sure you have a `name` and `version` in your `package.json` file. This is the file that will be shown on the npm website explaining everything inside your project. Add a `description` and `keywords` if you want to. 
- Also make sure you have a `repository` and `author` in your `package.json` file. The repository is the link to your project on GitHub. The author is your name. This information will be shown on the npm website.


Before you publish, make sure everything works by linking your package. You can do this by running the following command in your terminal:

```bash
npm link
# or
yarn link
```

Now, you can use your package in your project. To test, You can create another simple project and then you can do this by running the following command in your terminal:

```bash
npm link my-first-package
# or
yarn link my-first-package
```
> I would recommend you to create a `./test` folder and then create a `index.js` file in it. You can then test your package in that file.

Once you're sure about your hard work and you're really your code won't bring down production. You can publish your package. You can do this by running the following command in your terminal:

```bash
npm publish
# or
yarn publish
```

### Conclusion

We have now created a npm package. You can now create and publish your own packages to the registry i.e. [npm](npmjs.org). Congratulation!! You can now list it in your resume. 🎉