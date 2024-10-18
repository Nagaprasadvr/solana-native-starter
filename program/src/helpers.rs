use borsh::BorshSerialize;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, program_error::ProgramError,
    pubkey::Pubkey,
};

use crate::error::MyProgramError;

pub fn validate_pda(
    seeds: Vec<&[u8]>,
    pda: &Pubkey,
    bump: u8,
    program_id: &Pubkey,
) -> Result<(), MyProgramError> {
    let mut seeds_with_bump: Vec<&[u8]> = Vec::new();

    for seed in seeds {
        seeds_with_bump.push(seed);
    }

    let binding = [bump];

    seeds_with_bump.push(&binding);

    let actual_pda = Pubkey::create_program_address(&seeds_with_bump, program_id)
        .map_err(|_| MyProgramError::PdaPubekyMismatch)?;

    if actual_pda.ne(pda) {
        return Err(MyProgramError::PdaPubekyMismatch.into());
    }

    Ok(())
}

pub fn get_bytes32_from_string(data: String) -> Result<[u8; 32], ProgramError> {
    if data.len() > 32 {
        return Err(MyProgramError::SizeOverflow.into());
    }
    let mut bytes = [0u8; 32];
    let end = data.len();

    bytes[0..end].copy_from_slice(&data.as_bytes());

    Ok(bytes)
}

pub trait SerializeAndWriteToSolanaAccount: BorshSerialize {
    fn serialize_and_write_to_sol_acc(&self, solana_acc: &AccountInfo) -> ProgramResult {
        let mut data_bytes: Vec<u8> = Vec::new();
        self.serialize(&mut data_bytes)
            .map_err(|_| MyProgramError::SerializeError)?;

        if solana_acc.data_len() < data_bytes.len() {
            return Err(MyProgramError::SizeOverflow.into());
        }

        solana_acc
            .try_borrow_mut_data()?
            .copy_from_slice(&data_bytes);

        Ok(())
    }
}
