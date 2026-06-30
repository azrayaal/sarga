import { Button } from '@/components/ui/Button'

export function NotFoundPage() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-mega text-7xl text-race sm:text-9xl">404</p>
      <h1 className="mt-2 font-display text-2xl font-bold uppercase">Page not found</h1>
      <p className="mt-2 max-w-md text-sm text-ink-500">
        The page you’re looking for has left the grid. Let’s get you back to the action.
      </p>
      <Button asChildHref="/" size="lg" className="mt-8">Back to Home</Button>
    </section>
  )
}
