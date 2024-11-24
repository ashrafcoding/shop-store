import { Suspense } from "react"

Suspense
export default function CheckLayout({children}:{children:React.ReactNode}) {
  return (
    <div className="flex items-center justify-center h-screen">
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
    </div>
  )
}