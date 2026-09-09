const isObject = (item: unknown): item is Record<string, unknown> =>
  Boolean(item) && typeof item === 'object' && !Array.isArray(item)

/**
 * Recursieve merge, gebruikt om `overrides` op een veldfabriek toe te passen
 * (zie `fields/link.ts`). Arrays worden vervangen, niet samengevoegd.
 */
export default function deepMerge<T>(target: T, source: Partial<T>): T {
  if (!isObject(target) || !isObject(source)) return target

  const output: Record<string, unknown> = { ...target }

  for (const key of Object.keys(source)) {
    const sourceValue = (source as Record<string, unknown>)[key]
    const targetValue = output[key]

    output[key] =
      isObject(sourceValue) && isObject(targetValue)
        ? deepMerge(targetValue, sourceValue)
        : sourceValue
  }

  return output as T
}
