"use client"

import SearchDialogContent from "./SearchDialogContent"
import { Dialog, Modal, ModalOverlay } from "react-aria-components"

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

const SearchDialog = ({ open, onClose }: SearchDialogProps) => {
  return (
    <ModalOverlay
      isOpen={open}
      isDismissable
      onOpenChange={open => {
        if (!open) {
          onClose()
        }
      }}
      className="fixed inset-0 z-[110] flex items-start justify-center bg-black/20 backdrop-blur-sm data-[entering]:animate-fade-in data-[exiting]:animate-fade-out dark:bg-black/50"
    >
      <Modal className="mx-4 my-4 flex max-h-[calc(100%-2rem)] w-[40rem] max-w-[calc(100%-2rem)] flex-col rounded-lg bg-bg text-sm shadow-[rgba(0,0,0,0.2)_0px_10px_50px] data-[entering]:animate-dialog-fade-in data-[exiting]:animate-dialog-fade-out dark:bg-gray-100 lg:my-32 lg:max-h-[calc(100%-16rem)]">
        <Dialog
          aria-label="Search documentation ..."
          className="flex flex-col overflow-hidden"
        >
          <SearchDialogContent onClose={onClose} />
        </Dialog>
      </Modal>
    </ModalOverlay>
  )
}

export default SearchDialog
