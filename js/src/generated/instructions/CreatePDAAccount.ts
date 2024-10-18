/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import {
  CreateMyPdaAccountIx,
  createMyPdaAccountIxBeet,
} from '../types/CreateMyPdaAccountIx'

/**
 * @category Instructions
 * @category CreatePDAAccount
 * @category generated
 */
export type CreatePDAAccountInstructionArgs = {
  createMyPdaAccountIx: CreateMyPdaAccountIx
}
/**
 * @category Instructions
 * @category CreatePDAAccount
 * @category generated
 */
export const CreatePDAAccountStruct = new beet.FixableBeetArgsStruct<
  CreatePDAAccountInstructionArgs & {
    instructionDiscriminator: number
  }
>(
  [
    ['instructionDiscriminator', beet.u8],
    ['createMyPdaAccountIx', createMyPdaAccountIxBeet],
  ],
  'CreatePDAAccountInstructionArgs'
)
/**
 * Accounts required by the _CreatePDAAccount_ instruction
 *
 * @property [_writable_, **signer**] feePayerAcc
 * @property [_writable_] newPdaAcc
 * @property [] systemProgramAcc
 * @category Instructions
 * @category CreatePDAAccount
 * @category generated
 */
export type CreatePDAAccountInstructionAccounts = {
  feePayerAcc: web3.PublicKey
  newPdaAcc: web3.PublicKey
  systemProgramAcc: web3.PublicKey
}

export const createPDAAccountInstructionDiscriminator = 1

/**
 * Creates a _CreatePDAAccount_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 *
 * @category Instructions
 * @category CreatePDAAccount
 * @category generated
 */
export function createCreatePDAAccountInstruction(
  accounts: CreatePDAAccountInstructionAccounts,
  args: CreatePDAAccountInstructionArgs,
  programId = new web3.PublicKey('HHVuxvnj7X1KjCAp4iWBzLmTtYRhXHu1njK4x8eAsRRo')
) {
  const [data] = CreatePDAAccountStruct.serialize({
    instructionDiscriminator: createPDAAccountInstructionDiscriminator,
    ...args,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.feePayerAcc,
      isWritable: true,
      isSigner: true,
    },
    {
      pubkey: accounts.newPdaAcc,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgramAcc,
      isWritable: false,
      isSigner: false,
    },
  ]

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
