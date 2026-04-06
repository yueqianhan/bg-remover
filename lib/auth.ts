// 纯前端 Google Identity Services
// 不需要 next-auth，直接使用 Google 的 JavaScript SDK

export interface GoogleUser {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

export interface GoogleCredentialResponse {
  credential: string
  select_by: string
}

declare global {
  interface Window {
    google: any
  }
}
