export type DeviceType = 'Desktop' | 'Mobile' | 'Tablet' | 'Web' | 'Other'
export interface EventData {
  additionalProp1: string
  additionalProp2: string
  additionalProp3: string
}
export interface AdditionalData {
  eventName: string
  eventData: EventData
  timestamp: string // ISO 8601 format
}
export interface SystemProperties {
  osName: string
  osVersion: string
  locale: string
  appVersion: string
  appBuildNumber: string
  engineName: string
  engineVersion: string
  sdkVersion: string
  deviceModel: string
}
export interface PageView {
  sessionId?: string
  pageTitle?: string
  pageUrl?: string
  userId?: string
  deviceType?: DeviceType
  timestamp?: string // ISO 8601 format
  exitTimestamp?: string // ISO 8601 format
  referrerUrl?: string
  eventName?: string
  additionalData?: AdditionalData[]
  userAgent?: string
  ipAddress?: string
  acceptLanguage?: string
  systemProperties?: SystemProperties
}
export interface AnalyticsModel {
  trackingCode: string
  host: string
  pageViews: PageView[]
}
