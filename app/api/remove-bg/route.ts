import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ error: '未上传图片' }, { status: 400 })
    }

    // 转换为 Buffer（内存中）
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // 调用 remove.bg API
    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVEBG_API_KEY || '',
      },
      body: buffer,
    })

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text()
      console.error('remove.bg API 错误:', errorText)
      
      if (removeBgResponse.status === 402) {
        throw new Error('API 配额已用完，请稍后再试或升级套餐')
      } else if (removeBgResponse.status === 401) {
        throw new Error('API 密钥无效')
      } else {
        throw new Error('背景移除失败，请重试')
      }
    }

    // 直接返回图片流
    const resultBuffer = await removeBgResponse.arrayBuffer()

    return new NextResponse(resultBuffer, {
      headers: {
        'Content-Type': 'image/png',
        'Content-Disposition': `attachment; filename="no-bg-${Date.now()}.png"`,
      },
    })
  } catch (error) {
    console.error('处理错误:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '处理失败，请重试' },
      { status: 500 }
    )
  }
}
