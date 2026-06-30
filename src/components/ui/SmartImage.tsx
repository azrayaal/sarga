import { useState, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'
import { placeholder } from '@/lib/utils'

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Text shown in the generated fallback if the asset fails to load. */
  fallbackLabel?: string
}

/**
 * Image with a graceful, on-brand fallback. If the local asset is missing,
 * swaps to a generated SARGA placeholder instead of a broken-image icon.
 */
export function SmartImage({ fallbackLabel = 'SARGA', className, alt, ...props }: SmartImageProps) {
  const [errored, setErrored] = useState(false)
  return (
    <img
      {...props}
      alt={alt ?? ''}
      loading={props.loading ?? 'lazy'}
      className={cn('object-cover', className)}
      src={errored ? placeholder(fallbackLabel) : props.src}
      onError={() => setErrored(true)}
    />
  )
}
