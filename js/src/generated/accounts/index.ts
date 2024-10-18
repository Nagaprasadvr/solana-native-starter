export * from './MyAccount'
export * from './MyPdaAccount'

import { MyAccount } from './MyAccount'
import { MyPdaAccount } from './MyPdaAccount'

export const accountProviders = { MyAccount, MyPdaAccount }
