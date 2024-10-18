use borsh::BorshDeserialize;
use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult, pubkey::Pubkey};

use crate::{
    error::MyProgramError,
    instruction::{create_my_account, create_my_pda_account, MyProgramInstruction},
};

pub struct Processor {}

impl Processor {
    pub fn process_ix(
        program_id: &Pubkey,
        accounts: &[AccountInfo],
        instruction_data: &[u8],
    ) -> ProgramResult {
        let instruction = MyProgramInstruction::try_from_slice(instruction_data)
            .map_err(|_| MyProgramError::InvalidInstruction)?;

        match instruction {
            MyProgramInstruction::CreateAccount(data) => {
                create_my_account(program_id, accounts, data)
            }
            MyProgramInstruction::CreatePDAAccount(data) => {
                create_my_pda_account(program_id, accounts, data)
            }
        }
    }
}
