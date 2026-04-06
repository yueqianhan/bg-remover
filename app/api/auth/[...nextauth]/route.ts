// 不再需要 API 路由
// 这个文件会被删除，但先保留为空避免构建错误
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Auth is now client-side only' })
}

export async function POST() {
  return NextResponse.json({ message: 'Auth is now client-side only' })
}
