import { Trans } from '@lingui/macro'
import {
  Alert,
  AlertTitle,
  CircularProgress,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

const LayoutLoading = () => {
  const theme = useTheme()

  return (
    <Stack
      color={theme.palette.primary.main}
      direction="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      sx={{
        height: '100vh',
      }}
    >
      <Alert
        severity="info"
        sx={{
          position: 'absolute',
          px: '14px',
          py: '18px',
          top: '56px',
          width: '400px',
        }}
      >
        <AlertTitle>
          <Trans>Login info</Trans>
        </AlertTitle>
        <Typography variant="body2">
          <Trans>
            Please open your Chia wallet to be logged into your Climate wallet.
          </Trans>
        </Typography>
      </Alert>
      {/* TODO : add logo */}
      <Typography variant="h4">
        <Trans>Climate Wallet</Trans>
      </Typography>
      <CircularProgress sx={{ marginTop: '50px' }} />
      <Typography
        variant="caption"
        color="textPrimary"
        sx={{ marginTop: '12px' }}
      >
        <Trans>Loading...</Trans>
      </Typography>
    </Stack>
  )
}

export default LayoutLoading
