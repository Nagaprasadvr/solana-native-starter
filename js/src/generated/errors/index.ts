/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

type ErrorWithCode = Error & { code: number }
type MaybeErrorWithCode = ErrorWithCode | null | undefined

const createErrorFromCodeLookup: Map<number, () => ErrorWithCode> = new Map()
const createErrorFromNameLookup: Map<string, () => ErrorWithCode> = new Map()

/**
 * InvalidInstruction: 'Invalid Instruction (this ix is not supported)'
 *
 * @category Errors
 * @category generated
 */
export class InvalidInstructionError extends Error {
  readonly code: number = 0x0
  readonly name: string = 'InvalidInstruction'
  constructor() {
    super('Invalid Instruction (this ix is not supported)')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, InvalidInstructionError)
    }
  }
}

createErrorFromCodeLookup.set(0x0, () => new InvalidInstructionError())
createErrorFromNameLookup.set(
  'InvalidInstruction',
  () => new InvalidInstructionError()
)

/**
 * SerializeError: 'Serialize error'
 *
 * @category Errors
 * @category generated
 */
export class SerializeErrorError extends Error {
  readonly code: number = 0x1
  readonly name: string = 'SerializeError'
  constructor() {
    super('Serialize error')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SerializeErrorError)
    }
  }
}

createErrorFromCodeLookup.set(0x1, () => new SerializeErrorError())
createErrorFromNameLookup.set('SerializeError', () => new SerializeErrorError())

/**
 * PdaPubekyMismatch: 'PDA Pubkey Mismatch'
 *
 * @category Errors
 * @category generated
 */
export class PdaPubekyMismatchError extends Error {
  readonly code: number = 0x2
  readonly name: string = 'PdaPubekyMismatch'
  constructor() {
    super('PDA Pubkey Mismatch')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, PdaPubekyMismatchError)
    }
  }
}

createErrorFromCodeLookup.set(0x2, () => new PdaPubekyMismatchError())
createErrorFromNameLookup.set(
  'PdaPubekyMismatch',
  () => new PdaPubekyMismatchError()
)

/**
 * SizeOverflow: 'Size overflow'
 *
 * @category Errors
 * @category generated
 */
export class SizeOverflowError extends Error {
  readonly code: number = 0x3
  readonly name: string = 'SizeOverflow'
  constructor() {
    super('Size overflow')
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, SizeOverflowError)
    }
  }
}

createErrorFromCodeLookup.set(0x3, () => new SizeOverflowError())
createErrorFromNameLookup.set('SizeOverflow', () => new SizeOverflowError())

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 * @category generated
 */
export function errorFromCode(code: number): MaybeErrorWithCode {
  const createError = createErrorFromCodeLookup.get(code)
  return createError != null ? createError() : null
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 * @category generated
 */
export function errorFromName(name: string): MaybeErrorWithCode {
  const createError = createErrorFromNameLookup.get(name)
  return createError != null ? createError() : null
}
