import type { Detokenization, TokenMetaData } from './ClimateServiceType'

export interface CWAsset extends TokenMetaData {
  warehouseUnitId: string
  issuanceId: string
  projectLocationId: string
  projectDeveloper: string
  projectId: string
  projectLink: string
  currentRegistry: string
  projectName: string
  unitOwner: string
  orgUid: string
  countryJurisdictionOfOwner: string
  inCountryJurisdictionOfOwner: string | null
  vintageYear: string
  unitType: string
  marketplace: string
  marketplaceLink: string
  marketplaceIdentifier: string | null
  registryLogo: string
  sequence_num: number
  index: string
  public_key: string
  asset_id: string
  tokenization: {
    mod_hash: string
    public_key: string
  }
  detokenization: Detokenization
  permissionless_retirement: {
    mod_hash: string
    signature: string
  }
}

export type CWAssetIds = string[]

export interface ApiRes<T> {
  data: T
  status: number
}
