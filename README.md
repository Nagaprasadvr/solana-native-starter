Solana Native Starter

This is a starter project for Solana programs written in Rust

## Steps to start

# 1. clone the repo

```bash
git clone https://github.com/Nagaprasadvr/solana-native-starter.git
```

# 2. Directory structure

program/ - contains the rust program

- [src/](program/src/)
  - [entrypoint.rs](program/src/entrypoint.rs) - the entrypoint of the program
  - [lib.rs](program/src/lib.rs) - solana program crate
  - [instruction.rs](program/src/instruction.rs) - all instructions are defined here
  - [state.rs](program/src/state.rs) - all account states are defined here
  - [processor.rs](program/src/processor.rs) - the processor file
  - [error.rs](program/src/error.rs) - the error

js/ - contains the js client

- [js/tests/](js/tests/) - contains the tests for the program

# 3. Build and deploy the program

```bash
sudo chmod +rwx cicd.sh  (for first time)
./cicd.sh
```

dont forget to replace program id after program deployment in `prorgam/src/entrypoint.rs`

# 4. Generate the client

```bash
sudo chmod +rwx ./gen-client.sh (for first time)
./gen-client.sh

```

The generated client code is located in
[js/src/generated](js/src/generated/)

# 5. Running Tests

```bash
cd js && bun run test

```
