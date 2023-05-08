import {ReportContent, Type} from '@safer-streets/db'

import {calculateDateFromBy} from '~/date'

export function getMetadataFromContent(
  content: Pick<ReportContent, 'verified_at' | 'is_deleted'>,
  type: Pick<Type, 'verify_by' | 'expire_by'>
) {
  if (!content || !content.verified_at) return {}

  const {verify_by, expire_by} = type
  const lastVerified = Date.parse(content.verified_at)

  let verifyDate, expiryDate
  if (verify_by) verifyDate = calculateDateFromBy(lastVerified, verify_by)
  if (expire_by) expiryDate = calculateDateFromBy(lastVerified, expire_by)

  const isAging = verifyDate && verifyDate.valueOf() < Date.now()
  const isExpired = expiryDate && expiryDate.valueOf() < Date.now()
  const isHidden = content?.is_deleted || isExpired

  return {isAging, isExpired, isHidden, verifyDate, expiryDate}
}
