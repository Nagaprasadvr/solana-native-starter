/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'
import * as beetSolana from '@metaplex-foundation/beet-solana'

/**
 * Arguments used to create {@link MyAccount}
 * @category Accounts
 * @category generated
 */
export type MyAccountArgs = {
  data: number[] /* size: 32 */
}
/**
 * Holds the data for the {@link MyAccount} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class MyAccount implements MyAccountArgs {
  private constructor(readonly data: number[] /* size: 32 */) {}

  /**
   * Creates a {@link MyAccount} instance from the provided args.
   */
  static fromArgs(args: MyAccountArgs) {
    return new MyAccount(args.data)
  }

  /**
   * Deserializes the {@link MyAccount} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [MyAccount, number] {
    return MyAccount.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link MyAccount} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<MyAccount> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find MyAccount account at ${address}`)
    }
    return MyAccount.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      'EU3kA8Nf2ketyJNp4cjUuRtCW4Lbt8Ap3kuokE5FxaoS'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, myAccountBeet)
  }

  /**
   * Deserializes the {@link MyAccount} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [MyAccount, number] {
    return myAccountBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link MyAccount} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return myAccountBeet.serialize(this)
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link MyAccount}
   */
  static get byteSize() {
    return myAccountBeet.byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link MyAccount} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      MyAccount.byteSize,
      commitment
    )
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link MyAccount} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === MyAccount.byteSize
  }

  /**
   * Returns a readable version of {@link MyAccount} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      data: this.data,
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const myAccountBeet = new beet.BeetStruct<MyAccount, MyAccountArgs>(
  [['data', beet.uniformFixedSizeArray(beet.u8, 32)]],
  MyAccount.fromArgs,
  'MyAccount'
)
