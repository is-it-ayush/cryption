[issue]: /issues

### Cryption

**"Cryption"** is a lightweight, higher level wrapper around the `crypto.subtle` API. It provides some convenient function's by wrapping low-level Subtle API for an average regular developer like me to understand & use cryptography in daily life project's. It just works. : )

>Note: **DO NOT USE THIS IN PRODUCTION**. This library is **still in development** and is an alpha stage. *If you intend to use it, please do so at your own risk.*. I'm not responsible for bringing your prod down. : )

I built this as it's too hard to scroll the docs for my fellow [grug](https://grugbrain.dev/) developer's. : )

### Development

- `yarn install` to install all dependencies.
- `yarn test` to run the tests.

### Contribution

- Fork the repository.
- Create a new branch.
- Make your changes.
- Create a pull request.
- Wait for the review.
- Make changes if required.
- I merge your pull request if everything is fine.
- Congratulations!! You've just contributed to this repository. You are now a **proud contributor**. : )

You're also welcome to open an issue if you find any bug or have any suggestion for improvement.

### Roadmap

|       Status       | Description                            |           Currently Supported           |    Planned     |
| :----------------: | :------------------------------------- | :-------------------------------------: | :------------: |
| :white_check_mark: | `AES` support.                         |              CBC, CTR, GCM              |    KW, CMAC    |
| :white_check_mark: | `RSA` support.                         |                  OAEP                   |       -        |
| :white_check_mark: | Signature generation and verification. | HMAC, RSASSA-PKCS1-v1_5, ECDSA, RSA-PSS |       -        |
| :white_check_mark: | Key derivation                         |          PBKDF2, HKDF, SCRYPT           |       -        |
| :white_check_mark: | Key generation.                        |             AES, HMAC, RSA              | ECDSA, RSA-PSS |
|         🛋️          | Got More Ideas? Write an [issue].      |                   AES                   |       -        |

### Heartbeat

Roadmap was last updated on **29/12/2022 6:26 PM GMT**.

### License

This project is licensed under the MIT License, see the [LICENSE](LICENSE) file for details.

### Sources
If you want to know more about the `crypto.subtle` API, please check the
- [MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto) documentation.
- [W3C](https://www.w3.org/TR/WebCryptoAPI/) documentation.