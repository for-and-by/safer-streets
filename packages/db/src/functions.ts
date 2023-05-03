import {decode} from 'base64-arraybuffer'

import type {
  FormCreateValues,
  FormUpdateValues,
  ReportContent,
  SEVERITIES,
  TYPES,
} from '~/types/form'

import {SupabaseClient} from '~/client'
import {parseLngLat} from '~/helpers'

export async function deleteReport(id: number) {
  const report = await SupabaseClient.from('reports')
    .select('content_id')
    .eq('id', id)
    .limit(1)
    .single()

  if (report.error) throw report.error
  if (!report.data) throw `No report with id ${id} found.`

  const content = await SupabaseClient.from('reports_content')
    .select('*')
    .eq('id', report.data.content_id)
    .limit(1)
    .single()

  if (content.error) throw content.error
  if (!content.data) throw `No content with id ${report.data.content_id} found.`

  const {id: _, created_at: __, ...clonedData} = content.data

  const clone = await SupabaseClient.from('reports_content')
    .insert({
      ...clonedData,
      is_deleted: true,
    })
    .select()

  if (clone.error) throw clone.error
  if (!clone.data) throw 'No data was returned from content creation'

  const update = await SupabaseClient.from('reports')
    .update({
      content_id: clone.data[0].id,
      updated_at: new Date(Date.now()).toISOString(),
    })
    .eq('id', id)

  if (update.error) throw update.error

  return {report, content, clone, update}
}

export async function verifyReport(id: number) {
  const update = await SupabaseClient.from('reports')
    .update({
      updated_at: new Date(Date.now()).toISOString(),
    })
    .eq('id', id)

  if (update.error) throw update.error

  return {update}
}

export async function updateReport(values: FormUpdateValues, imageUrl?: string) {
  const report = await SupabaseClient.from('reports')
    .select('content_id')
    .eq('id', values.id)
    .limit(1)
    .single()

  if (report.error) throw report.error
  if (!report.data) throw `No report with id ${values.id} found.`

  const content = await SupabaseClient.from('reports_content')
    .select('*')
    .eq('id', report.data.content_id)
    .limit(1)
    .single()

  if (content.error) throw content.error
  if (!content.data) throw `No content with id ${report.data.content_id} found.`

  const {id: _, created_at: __, ...clonedData} = content.data

  const mappedContentValues: Partial<ReportContent> = {
    image_url: imageUrl,
    severity_handle: values.severity as SEVERITIES,
    details: values.details,
  }

  const newContentData = Object.keys(mappedContentValues).reduce((data, key) => {
    const value = mappedContentValues[key as keyof typeof mappedContentValues]
    if (!value) return data
    return {...data, [key]: value}
  }, {})

  const clone = await SupabaseClient.from('reports_content')
    .insert({...clonedData, ...newContentData})
    .select()

  if (clone.error) throw clone.error
  if (!clone.data) throw 'No data was returned from content creation'

  const update = await SupabaseClient.from('reports')
    .update({
      content_id: clone.data[0].id,
      updated_at: new Date(Date.now()).toISOString(),
      ...(values.type ? {type_handle: values.type as TYPES} : {}),
    })
    .eq('id', values.id)

  if (update.error) throw update.error

  return {report, content, clone, update}
}

export async function uploadFile(image?: string) {
  console.log('input: ', {image})

  if (!image) return

  const timestamp = Date.now()
  const filename = `report-img-${timestamp}.jpeg`
  const base64 = image.split(',')[1]

  console.log('processed input: ', {timestamp, filename, base64})

  const upload = await SupabaseClient.storage
    .from('users')
    .upload(`reports/${filename}`, decode(base64), {
      contentType: 'image/jpeg',
    })

  console.log('upload result: ', {upload})

  if (upload.error) throw upload.error
  if (!upload.data) throw 'No data returned'

  const url = SupabaseClient.storage.from('users').getPublicUrl(upload.data.path)
  if (!url.data) throw 'No url generated'

  return url.data.publicUrl
}

export async function uploadReport(data: FormCreateValues, imageUrl?: string) {
  const [lng, lat] = parseLngLat(data.location.coordinates)

  const report = await SupabaseClient.from('reports')
    .insert({
      lng,
      lat,
      type_handle: data.type as TYPES,
    })
    .select()

  if (report.error) throw report.error
  if (!report.data) throw 'No data was returned from reports upload.'

  const content = await SupabaseClient.from('reports_content')
    .insert({
      report_id: report.data[0].id,
      details: data.details,
      severity_handle: data.severity as SEVERITIES,
      data: data.custom ?? {},
      image_url: imageUrl,
    })
    .select()

  if (content.error) throw content.error
  if (!content.data) throw 'No data was returned from reports content upload'

  const update = await SupabaseClient.from('reports')
    .update({
      content_id: content.data[0].id,
    })
    .eq('id', report.data[0].id)
    .select('*')

  if (update.error) throw update.error

  return {content, report}
}

export async function fetchTypes(handle?: string) {
  const query = SupabaseClient.from('types').select('*')

  if (handle) query.match({handle})

  const types = await query
  if (types.error) throw types.error
  if (!types.data) throw 'No data was returned from fetch'

  return types.data
}

export async function fetchSeverities(handle?: string) {
  const query = SupabaseClient.from('severities').select('*')

  if (handle) query.match({handle})

  const severities = await query
  if (severities.error) throw severities.error
  if (!severities.data) throw 'No data was returned from fetch'

  return severities.data
}

interface FetchFilters {
  lastSynced?: string
}

export async function fetchReports(filters?: FetchFilters) {
  const query = SupabaseClient.from('reports').select(
    '*, type:type_handle (expire_by, verify_by), content:content_id (is_deleted) '
  )

  if (filters?.lastSynced) query.gt('updated_at', filters.lastSynced)

  const reports = await query
  if (reports.error) throw reports.error
  if (!reports.data) throw 'No data was returned from fetch'

  return reports.data
}

export async function fetchReportSummary(id: string | number) {
  const query = SupabaseClient.from('reports')
    .select(
      'id, lng, lat, updated_at, type:type_handle (title, verify_by), content:content_id(image_url, severity:severity_handle(title))'
    )
    .eq('id', id)
    .limit(1)
    .single()

  const reports = await query
  if (reports.error) throw reports.error
  if (!reports.data) throw 'No data was returned from fetch'

  return reports.data
}

export async function fetchReportContent(id: string | number) {
  const query = SupabaseClient.from('reports')
    .select('*, type:type_handle(*), content:content_id(*, severity:severity_handle (*))')
    .eq('id', id)
    .limit(1)
    .single()

  const reports = await query
  if (reports.error) throw reports.error
  if (!reports.data) throw 'No data was returned from fetch'

  return reports.data
}
