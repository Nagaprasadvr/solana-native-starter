use borsh::{BorshDeserialize, BorshSerialize};
use shank::ShankInstruction;
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint::ProgramResult,
    program_error::ProgramError,
    pubkey::Pubkey,
    sysvar::Sysvar,
};

use crate::{
    helpers::validate_pda,
    state::{MyAccount, MyPdaAccount},
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CreateMyAccountIx {
    pub data: String,
}

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct CreateMyPdaAccountIx {
    pub data: String,
    pub bump: u8,
}

#[derive(BorshSerialize, BorshDeserialize, Debug, ShankInstruction)]
pub enum MyProgramInstruction {
    #[account(
        0,
        writable,
        signer,
        name = "fee_payer_acc",
        desc = "Fee payer account"
    )]
    #[account(1, writable, signer, name = "new_acc", desc = "New account")]
    #[account(2, name = "system_program_acc", desc = "System program account")]
    CreateAccount(CreateMyAccountIx),
    #[account(
        0,
        writable,
        signer,
        name = "fee_payer_acc",
        desc = "Fee payer account"
    )]
    #[account(1, writable, name = "new_pda_acc", desc = "New PDA account")]
    #[account(2, name = "system_program_acc", desc = "System program account")]
    CreatePDAAccount(CreateMyPdaAccountIx),
}

pub fn get_lamports_for_rent_exempt(size: u64) -> Result<u64, ProgramError> {
    let rent = solana_program::rent::Rent::get()?;
    let lamports = rent.minimum_balance(size as usize);
    Ok(lamports)
}

pub fn create_my_account(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: CreateMyAccountIx,
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let fee_payer_acc = next_account_info(accounts_iter)?;
    let new_acc = next_account_info(accounts_iter)?;
    let system_program_acc = next_account_info(accounts_iter)?;

    let lamports = get_lamports_for_rent_exempt(MyAccount::size())?;

    let create_account_ix = solana_program::system_instruction::create_account(
        fee_payer_acc.key,
        new_acc.key,
        lamports,
        MyAccount::size(),
        program_id,
    );

    solana_program::program::invoke(
        &create_account_ix,
        &[
            fee_payer_acc.clone(),
            new_acc.clone(),
            system_program_acc.clone(),
        ],
    )?;

    MyAccount::new(data, new_acc)?;

    Ok(())
}

pub fn create_my_pda_account(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    data: CreateMyPdaAccountIx,
) -> ProgramResult {
    let accounts_iter = &mut accounts.iter();
    let fee_payer_acc = next_account_info(accounts_iter)?;
    let new_pda_acc = next_account_info(accounts_iter)?;
    let system_program_acc = next_account_info(accounts_iter)?;

    let lamports = get_lamports_for_rent_exempt(MyPdaAccount::size())?;

    let create_account_ix = solana_program::system_instruction::create_account(
        fee_payer_acc.key,
        new_pda_acc.key,
        lamports,
        MyPdaAccount::size(),
        program_id,
    );

    let pda_acc_seeds = vec!["pda_accc".as_bytes(), fee_payer_acc.key.as_ref()];

    validate_pda(pda_acc_seeds, new_pda_acc.key, data.bump, program_id)?;

    solana_program::program::invoke_signed(
        &create_account_ix,
        &[
            fee_payer_acc.clone(),
            new_pda_acc.clone(),
            system_program_acc.clone(),
        ],
        &[&[
            "pda_accc".as_bytes(),
            fee_payer_acc.key.as_ref(),
            &[data.bump],
        ]],
    )?;

    MyPdaAccount::new(data, new_pda_acc)?;

    Ok(())
}
