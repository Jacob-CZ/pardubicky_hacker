// app/providers.tsx

import { ThemeProvider } from '@/components/theme-provider'
import {NextUIProvider} from '@nextui-org/react'
export function Providers({children}: { children: React.ReactNode }) {
  return (
    <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
    <NextUIProvider>
      {children}
    </NextUIProvider>
  </ThemeProvider>
  )
}