import { Loading } from '@/components/loading'
import { ExportButton, TokenListItem } from '@/components/token'
import { useGetAllCWAssets } from '@/hooks/useGetAllCWAssets'
import { useDetokenzationBlockingList } from '@/hooks/useLoaclStorage'
import {
  useCWAddStrayCats,
  useSelectedWallet,
  useWalletsBalance,
  useWalletsList,
} from '@/hooks/wallet'
import { WalletType } from '@chia/api'
import { Trans } from '@lingui/macro'
import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'

enum TokeSortEnum {
  QuentyHL = 0, // Quantity - high to low
  QuentyLH = 1, // Quantity -  low to high
  NameAZ = 2, // Name -  A to Z
  NameZA = 3, // Name -  Z to A
}

const StyledRoot = styled(Stack)(({ theme }) => ({
  width: '400px',
  height: '100%',
  // TODO : check why overflow not work, so it need more padding to active scroll
  padding: '32px 30px 80px 40px',
  borderRight: `1px solid ${theme.palette.divider}`,
  flexGrow: 1,
  overflowY: 'auto',
}))

export default function TokenSidebar() {
  const { isLoadingAddStrayCats } = useCWAddStrayCats()
  const { list: wallets, isLoading: isLoadingWallets } = useWalletsList(
    [WalletType.STANDARD_WALLET, WalletType.CAT],
    ''
  )
  const { walletId, setWalletId } = useSelectedWallet()

  const [tokenSort, setTokenSort] = useState<TokeSortEnum>(
    TokeSortEnum.QuentyHL
  )
  const { isDetokenWallet } = useDetokenzationBlockingList()

  const {
    data: allCWAssets,
    isLoading: isLoadingAllCWAssets,
    error: errorAllCWAssets,
  } = useGetAllCWAssets()

  const isLoading =
    isLoadingWallets || isLoadingAllCWAssets || isLoadingAddStrayCats

  const filteredWallet = useMemo(() => {
    if (!wallets || !allCWAssets) {
      return []
    }
    return wallets.filter((wallet) =>
      allCWAssets.some(
        (asset) => asset.marketplaceIdentifier === wallet.assetId
      )
    )
  }, [wallets, allCWAssets])

  const { isLoading: isLoadingWalletsBalance, data: walletsBalance } =
    useWalletsBalance(filteredWallet)

  console.log('walletsBalance', walletsBalance)

  useEffect(() => {
    if (!walletId && filteredWallet.length > 0) {
      setWalletId(filteredWallet[0].walletId)
    }
  }, [filteredWallet])

  useEffect(() => {
    // TODO
    switch (tokenSort) {
      default:
      case TokeSortEnum.QuentyHL:
        break
      case TokeSortEnum.QuentyLH:
        break
      case TokeSortEnum.NameAZ:
        break
      case TokeSortEnum.NameZA:
        break
    }
  }, [tokenSort])

  const allCWAssetsCSVData = useMemo(() => {
    if (!allCWAssets) return []
    return allCWAssets.map((asset) => {
      // TODO : check data
      return {
        Registry: asset.currentRegistry,
        'Project Name': asset.projectName,
        'Project ID': asset.projectId,
        'Vintage Year': asset.vintageYear,
        'Project Link': asset.projectLink,
        'CW Link': '',
      }
    })
  }, [allCWAssets])

  const theme = useTheme()

  return (
    <StyledRoot direction="column" gap={3}>
      <Stack direction="column" spacing={3}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">
            <Trans>My Wallet</Trans>
          </Typography>
          <ExportButton fileName="token.csv" data={allCWAssetsCSVData} />
        </Stack>
      </Stack>

      {isLoading ? (
        <Loading center />
      ) : filteredWallet.length > 0 ? (
        <Stack spacing={1} direction="column">
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              color: theme.palette.text.secondary,
              mb: 3,
            }}
          >
            <Typography variant="body2">
              <Trans>Sort by</Trans>
            </Typography>
            <FormControl sx={{ flex: 1 }}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={tokenSort}
                displayEmpty
                onChange={(event) => {
                  setTokenSort(event.target.value as TokeSortEnum)
                }}
                sx={{
                  height: '40px',
                  color: theme.palette.text.secondary,
                }}
              >
                <MenuItem value={TokeSortEnum.QuentyHL}>
                  <Trans>Quantity - high to low</Trans>
                </MenuItem>
                <MenuItem value={TokeSortEnum.QuentyLH}>
                  <Trans>Quantity - low to high</Trans>
                </MenuItem>
                <MenuItem value={TokeSortEnum.NameAZ}>
                  <Trans>Name - A to Z</Trans>
                </MenuItem>
                <MenuItem value={TokeSortEnum.NameZA}>
                  <Trans>Name - Z to A</Trans>
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
          {filteredWallet.map((wallet) => {
            const { walletId, assetId } = wallet
            return (
              <TokenListItem
                key={assetId ?? walletId}
                walletId={Number(walletId)}
                isDetoken={isDetokenWallet(walletId)}
              />
            )
          })}
        </Stack>
      ) : (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            py: '100px',
          }}
        >
          <Typography variant="body2" color="textSecondary">
            No projects.
          </Typography>
        </Stack>
      )}
    </StyledRoot>
  )
}
