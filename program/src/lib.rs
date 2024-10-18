pub mod error;
pub mod helpers;
pub mod instruction;
pub mod processor;
pub mod state;

#[cfg(not(feature = "no-entrypoint"))]
mod entrypoint;

// change the program id after deploying the program
solana_program::declare_id!("HHVuxvnj7X1KjCAp4iWBzLmTtYRhXHu1njK4x8eAsRRo");
