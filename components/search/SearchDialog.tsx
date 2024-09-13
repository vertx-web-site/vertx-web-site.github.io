"use client"

import * as Dialog from "@radix-ui/react-dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import SearchDialogContent from "./SearchDialogContent"

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

const SearchDialog = ({ open, onClose }: SearchDialogProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={open => {
        if (open) {
          onClose()
        }
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay
          className="fixed inset-0 z-[90] bg-black/20 backdrop-blur-sm dark:bg-black/50 [&[data-state='closed']]:animate-fade-out [&[data-state='open']]:animate-fade-in"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="h-full w-[40rem] max-w-full lg:h-3/4">
            <Dialog.Content
              className="flex max-h-full w-full flex-col rounded-lg bg-bg text-sm shadow-[rgba(0,0,0,0.2)_0px_10px_50px] dark:bg-gray-100 [&[data-state='closed']]:animate-dialog-fade-out [&[data-state='open']]:animate-dialog-fade-in"
              onEscapeKeyDown={() => onClose()}
              onInteractOutside={() => onClose()}
              onPointerDownOutside={() => onClose()}
            >
              <VisuallyHidden.Root>
                <Dialog.DialogTitle>Search</Dialog.DialogTitle>
                <Dialog.Description>
                  Search documentation ...
                </Dialog.Description>
              </VisuallyHidden.Root>
              <SearchDialogContent onClose={onClose} />
            </Dialog.Content>
          </div>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default SearchDialog
