import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('image') as File

    if (!file) {
      console.error('未收到图片文件')
      return NextResponse.json({ error: '未上传图片' }, { status: 400 })
    }

    console.log('收到文件:', {
      name: file.name,
      type: file.type,
      size: file.size
    })

    // 转换为 Buffer（内存中）
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    console.log('Buffer 大小:', buffer.length, 'bytes')

    // 调用 remove.bg API
    const removeBgFormData = new FormData()
    removeBgFormData.append('image_file_b64', buffer.toString('base64'))
    removeBgFormData.append('size', 'auto')

    const removeBgResponse = await fetch('https://api.remove.bg/v1.0/removebg', {
      method: 'POST',
      headers: {
        'X-Api-Key': process.env.REMOVEBG_API_KEY || '',
      },
      body: removeBgFormData,
    })

    if (!removeBgResponse.ok) {
      const errorText = await removeBgResponse.text()
      console.error('remove.bg API 错误:', {
        status: removeBgResponse.status,
        statusText: removeBgResponse.statusText,
        body: errorText
      })
      
      if (removeBgResponse.status === 402) {
        throw new Error('API 配额已用完，请稍后再试或升级套餐')
      } else if (removeBgResponse.status === 401) {
        throw new Error('API 密钥无效')
      } else {
        throw new Error(`背景移除失败 (状态码: ${removeBgResponse.status}): ${errorText}`)
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
