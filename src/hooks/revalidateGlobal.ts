import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

/**
 * Header en footer zitten in de root layout, dus elke pagina houdt een kopie
 * ervan in de routecache. `'layout'` als tweede argument leegt die cache voor
 * de hele boom onder `/` — een `revalidatePath('/')` zonder dat argument raakt
 * alleen de homepage en laat elke andere pagina het oude menu tonen.
 */
export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info('Revalidating layout na wijziging in een global')
    revalidatePath('/', 'layout')
  }

  return doc
}
