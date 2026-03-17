'use client'

import { useState } from 'react'

export default function Home() {
  const [file, setFile] = useState<File | null>(null)
  const [processing, setProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState<string>('')
  const [error, setError] = useState('')
  const [previewUrl, setPreviewUrl] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (!selectedFile) return

    // 验证文件类型
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(selectedFile.type)) {
      setError('仅支持 JPG、PNG、WEBP 格式')
      setFile(null)
      setPreviewUrl('')
      return
    }

    // 验证文件大小（10MB）
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError('文件大小不能超过 10MB')
      setFile(null)
      setPreviewUrl('')
      return
    }

    setFile(selectedFile)
    setError('')
    setPreviewUrl(URL.createObjectURL(selectedFile))
    setResultUrl('')
  }

  const handleSubmit = async () => {
    if (!file) return

    setProcessing(true)
    setError('')

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || '处理失败')
      }

      const blob = await res.blob()
      setResultUrl(URL.createObjectURL(blob))
    } catch (err) {
      setError(err instanceof Error ? err.message : '处理失败，请重试')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
            背景移除工具
          </h1>
          <p className="text-center text-gray-500 mb-8">
            快速移除图片背景，3 步完成
          </p>

          {/* 上传区域 */}
          <div className="mb-6">
            <label
              htmlFor="file-upload"
              className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                previewUrl
                  ? 'border-green-400 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {previewUrl ? (
                <div className="relative w-full h-full flex items-center justify-center p-4">
                  <img
                    src={previewUrl}
                    alt="预览"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-12 h-12 mb-4 text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">点击上传</span> 或拖拽图片到此处
                  </p>
                  <p className="text-xs text-gray-500">
                    支持 JPG, PNG, WEBP（最大 10MB）
                  </p>
                </div>
              )}
              <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
              />
            </label>
          </div>

          {/* 错误提示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* 处理按钮 */}
          <button
            onClick={handleSubmit}
            disabled={!file || processing}
            className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all ${
              !file || processing
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
            }`}
          >
            {processing ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                处理中...
              </span>
            ) : (
              '移除背景'
            )}
          </button>

          {/* 结果展示 */}
          {resultUrl && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">处理结果</h2>
                <span className="text-sm text-green-600 font-medium">✓ 完成</span>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <img
                  src={resultUrl}
                  alt="处理结果"
                  className="w-full rounded-lg border-2 border-dashed border-gray-200"
                />
              </div>
              <a
                href={resultUrl}
                download={`no-bg-${Date.now()}.png`}
                className="block w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg text-center transition-colors"
              >
                下载图片
              </a>
            </div>
          )}

          {/* 使用说明 */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">使用说明</h3>
            <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
              <li>上传需要处理的图片</li>
              <li>点击"移除背景"按钮</li>
              <li>等待处理完成并下载结果</li>
            </ol>
            <p className="text-xs text-gray-400 mt-3">
              基于 remove.bg API · 免费版每月 50 张
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
