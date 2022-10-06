import type { Wallet } from '@chia/api'
import { WalletType } from '@chia/api'
import { useGetCatListQuery, useGetWalletsQuery } from '@chia/api-react'
import { useCurrencyCode } from '@chia/core'
import { useMemo } from 'react'

export interface IUseWalletProps {
  loading: boolean
  wallet?: Wallet
  unit?: string
}

export default function useWallet(walletId?: number | string): IUseWalletProps {
  const currencyCode = useCurrencyCode()
  const { data: wallets, isLoading } = useGetWalletsQuery()
  const { data: catList = [], isLoading: isCatListLoading } =
    useGetCatListQuery()

  const wallet = useMemo(() => {
    return wallets?.find((item) => item.id.toString() === walletId?.toString())
  }, [wallets, walletId])

  const unit = useMemo(() => {
    if (wallet) {
      if (!isCatListLoading && wallet.type === WalletType.CAT) {
        const token = catList.find(
          (item) => item.assetId === wallet.meta?.assetId
        )
        if (token) {
          return token.symbol
        }

        return undefined
      }

      return currencyCode
    }
  }, [wallet, currencyCode, isCatListLoading])

  return {
    wallet,
    loading: isLoading,
    unit,
  }
}
