import usePrompt from '@/hooks/usePrompt'
import { Trans } from '@lingui/macro'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material'
import { ReactNode } from 'react'

interface TransactionPrompt {
  when: boolean
  content?: string | ReactNode
}

const TransactionPrompt = ({
  when,
  content = <Trans>Are you sure to leave?</Trans>,
}: TransactionPrompt) => {
  const [showPrompt, setShowPrompt, next] = usePrompt(when)

  const handleClose = () => {
    setShowPrompt(false)
  }

  return (
    <Dialog open={showPrompt} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>
          <Trans>No</Trans>
        </Button>
        <Button
          onClick={() => {
            next()
          }}
        >
          <Trans>Yes</Trans>
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionPrompt
