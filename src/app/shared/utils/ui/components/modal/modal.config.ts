export const ModalConfig = {
  sizes: {
    small: 'small' as const,
    medium: 'medium' as const,
    large: 'large' as const,
  },
  defaults: {
    size: 'medium' as const,
    backdropDismiss: true,
  },
  icons: {
    close: 'close',
  },
} as const;
