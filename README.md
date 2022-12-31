[issue]: ../issues/new

### Cryption

> `yarn add @isitayush/cryption`

**"Cryption"** is a lightweight, higher level wrapper around the `crypto.subtle` API. It provides some convenient function's by wrapping low-level Subtle API for an average regular developer like me to understand & use cryptography in daily life project's. It just works. <3

>Note: **DO NOT USE THIS IN PRODUCTION**. This library is **still in development** and is an alpha stage. *If you intend to use it, please do so at your own risk.*. I'm not responsible for bringing your prod down. : )

I built this as it's too hard to scroll the docs for my fellow [grug](https://grugbrain.dev/) developer's. : )

### How to use

You can checkout the [examples](./how-to-project/index.ts) folder for examples. I will add more examples in the future.

### Development

- `yarn install` to install all dependencies.
- `yarn test` to run the tests.

### Contribution

Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for submitting pull requests to the project. If you want to become a maintainer, drop me a message on twitter [@is_it_ayush](https://twitter.com/is_it_ayush). I will add you as a maintainer. Thank You! I appreciate your help in improving the quality of the documentation and code and the repository. 💙

### Roadmap

|       Status       | Description                            |           Currently Supported           |    Planned     |
| :----------------: | :------------------------------------- | :-------------------------------------: | :------------: |
| :white_check_mark: | `AES` support.                         |              CBC, CTR, GCM              |    KW, CMAC    |
| :white_check_mark: | `RSA` support.                         |                  OAEP                   |       -        |
| :white_check_mark: | Signature generation and verification. | HMAC, RSASSA-PKCS1-v1_5, ECDSA, RSA-PSS |       -        |
| :white_check_mark: | Key derivation                         |          PBKDF2, HKDF, SCRYPT           |       -        |
| :white_check_mark: | Key generation.                        |             AES, HMAC, RSA              | ECDSA, RSA-PSS |
|         🛋️          | Got More Ideas? Write an [issue].      |                   AES                   |       -        |

I've plans to make it a lot easier with syntax such as `cryption.keys.generate` and `cryption.encrypt.aes`. I'll also add support for more algorithms. Contributions, Suggestions, Tips, Ideas are always heartily welcome. : )

### Heartbeat

Roadmap was last updated on **30/12/2022 10:47 pm GMT**.
> Note: This is a personal project and I'm not working on it full-time. I'll try to work on it in my free time. : )

### License

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.

### Sources
If you want to know more about the `crypto.subtle` API, please check the
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) documentation.
- [W3C](https://www.w3.org/TR/WebCryptoAPI/) documentation.