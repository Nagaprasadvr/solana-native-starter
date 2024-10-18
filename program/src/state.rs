use crate::{
    helpers::{get_bytes32_from_string, SerializeAndWriteToSolanaAccount},
    instruction::{CreateMyAccountIx, CreateMyPdaAccountIx},
};
use borsh::{BorshDeserialize, BorshSerialize};
use shank::ShankAccount;
use solana_program::{account_info::AccountInfo, entrypoint::ProgramResult};

#[derive(BorshSerialize, BorshDeserialize, Debug, ShankAccount)]
pub struct MyAccount {
    pub data: [u8; 32],
}

#[derive(BorshSerialize, BorshDeserialize, Debug, ShankAccount)]
pub struct MyPdaAccount {
    pub data: [u8; 32],
}

impl SerializeAndWriteToSolanaAccount for MyAccount {}

impl SerializeAndWriteToSolanaAccount for MyPdaAccount {}

impl MyAccount {
    pub fn size() -> u64 {
        32
    }

    pub fn new(data: CreateMyAccountIx, new_acc: &AccountInfo) -> ProgramResult {
        let my_account = MyAccount {
            data: get_bytes32_from_string(data.data)?,
        };

        my_account.serialize_and_write_to_sol_acc(new_acc)?;

        Ok(())
    }
}

impl MyPdaAccount {
    pub fn size() -> u64 {
        32
    }

    pub fn new(data: CreateMyPdaAccountIx, new_acc: &AccountInfo) -> ProgramResult {
        let my_account = MyPdaAccount {
            data: get_bytes32_from_string(data.data)?,
        };

        my_account.serialize_and_write_to_sol_acc(new_acc)?;

        Ok(())
    }
}
