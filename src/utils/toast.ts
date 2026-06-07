import toast from 'react-hot-toast'

const toastStyle = {
  background: 'var(--cream-lightest)',
  color: 'var(--navy-base)',
  border: '0.5px solid var(--cream-deep)',
  borderRadius: '2px',
  padding: '14px 20px',
  fontSize: '0.75rem',
  fontFamily: "'DM Sans', sans-serif",
  fontWeight: 300,
  letterSpacing: '0.06em',
  boxShadow: '0 8px 28px rgba(28, 35, 64, 0.1)',
}

const toastBase = {
  style: toastStyle,
  iconTheme: {
    primary: 'var(--navy-base)',
    secondary: 'var(--cream-lightest)',
  },
}

export function showLoadingToast(message = 'Preparing your session') {
  return toast.loading(message, {
    ...toastBase,
    duration: Infinity,
  })
}

export function showConstructionToast(
  message = 'Website under construction — launching soon at makeindiasafe.com',
) {
  return toast(message, {
    ...toastBase,
    duration: 5000,
    icon: null,
  })
}

export function dismissToast(id: string) {
  toast.dismiss(id)
}

export function showNotifyToast() {
  return toast.promise(
    new Promise<string>((resolve) => {
      setTimeout(() => resolve('Registered for launch notification.'), 1600)
    }),
    {
      loading: 'Saving your request',
      success: 'Registered for launch notification.',
      error: 'Unable to save. Please try again.',
    },
    toastBase,
  )
}

export const toasterOptions = {
  position: 'top-center' as const,
  toastOptions: {
    style: toastStyle,
    className: 'mis-toast',
  },
}
