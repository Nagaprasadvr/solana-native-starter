use solana_program::{
    msg,
    program_error::{PrintProgramError, ProgramError},
};
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, PartialEq)]
pub enum MyProgramError {
    #[error("Invalid Instruction (this ix is not supported)")]
    InvalidInstruction,
    #[error("Serialize error")]
    SerializeError,
    #[error("PDA Pubkey Mismatch")]
    PdaPubekyMismatch,
    #[error("Size overflow")]
    SizeOverflow,
}

impl From<MyProgramError> for ProgramError {
    fn from(e: MyProgramError) -> Self {
        ProgramError::Custom(e as u32)
    }
}

impl PrintProgramError for MyProgramError {
    fn print<E>(&self) {
        msg!("Error: {:?}", self);
    }
}
