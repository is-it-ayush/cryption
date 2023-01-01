### 0.0.9-alpha

- [x] Fixed the issue with the AES-GCM not working. Removed the need to specify algorithms in encrypt and decrypt functions. You can now just pass the key and the data to encrypt or decrypt. The library will automatically detect the algorithm and use it. : )
- [x] Better Error Handling. Throws a DOMException if the key is invalid or the data is invalid instead of taking down the whole application. 
- [x] Much clearer error messages.
- [x] API Changes. Removed the `helpers` category. Instead everything is now in the `cryption` object.
- [x] Updated `README.md` and `CHANGELOG.md` to reflect the changes. 
- [x] Updated `/how-to-project/index.ts` to reflect the changes.

### 0.0.8-alpha

- [x] Minor changes.

### 0.0.7-alpha

- [x] Fixed the issue where the library won't work due to API issue's.

### 0.0.6-alpha

- [x] Added prettier, formatting, tags and other stuff that will help in development and ship better code.
- [x] Fixed the issue where the library won't work and gave error in any react based projects. (It was because I wasn't really shipping the `dist` folder but the `src` folder. My bad.)
- [x] Added Type Definitions for the library.

### 0.0.5-alpha

- [x] Added a lot more documentation.
- [x] Improved the default values.
- [x] More typesafety.
- [x] Added a `cryption.helpers.random.salt` function. You can use it to generate a random salt. Example: `cryption.helpers.random.salt(16)` will generate a random salt of length 16 bits. Some algorithms require a specific salt length. You can check the google for that.
- [x] Added better examples in `./how-to-project/index.ts` file.

### 0.0.4-alpha

- [x] Syntax Changes. Every algorithm is now more readable and easier to understand.
- [x] Added `.helpers` for various helper functions such as generating an iv or exporting keys. 

### 0.0.3-alpha

- [x] Added `LICENSE` file.
- [x] Updated `README.md` file.

### 0.0.2-alpha
Fixes:
- [x] Updated README.md.
- [x] Updated the `LEARN.md` file.
- [x] Added `CHANGELOG` file.
 
### 0.0.1-alpha
- Initial release.