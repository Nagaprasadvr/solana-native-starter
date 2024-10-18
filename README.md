# Solana Native Starter

### This is a solana native starter project with batteries included

## Steps to start (Please use wsl or linux for smooth devux)

### 1. clone the repo

```bash
git clone git@github.com:Nagaprasadvr/solana-native-starter.git
```

### 2. Directory structure

- [program/](program/) - contains the rust program

- [src/](program/src/)

  - [entrypoint.rs](program/src/entrypoint.rs) - the entrypoint of the program
  - [lib.rs](program/src/lib.rs) - solana program lib crate
  - [instruction.rs](program/src/instruction.rs) - all instructions are defined here

    **Note:** instructions are annotated with `#[accounts(...)]` `shank macros` which are required to generate client code

  - [state.rs](program/src/state.rs) - all account states are defined here

    **Note:** state is deriving `ShankAccount` which is required to generate client code

  - [processor.rs](program/src/processor.rs) - the processor file
  - [error.rs](program/src/error.rs) - program errors are listed here
  - [helper.rs](program/src/helpers.rs) - helpers and constants for program

- [js/](js/) - contains the js `client`

- [js/tests/](js/tests/) - contains the `tests` for the program

### 3. Setup

```bash
sudo chmod +rwx cicd.sh && sudo chmod +rwx gen-client.sh #for first time to provide permissions
```

### 4. Run the solana test validator for deployment and testing

```bash
solana-test-validator
```

### 5. Build and deploy the program

**Note:** change program name in [program/Cargo.toml](program/Cargo.toml) and [js/.solitarc.js](js/.solitarc.js) before deployment

```bash
bash ./cicd.sh
```

dont forget to replace program id after program deployment in [prorgam/src/lib.rs](program/src//lib.rs)

### 6. Generate the client

```bash
bash ./gen-client.sh
```

The generated client code is located in
[js/src/generated](js/src/generated/)

### 7. Running Tests

```bash
cd js && bun run test
```
