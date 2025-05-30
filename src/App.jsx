import { useState } from 'react'
import axios from 'axios'

function App() {
  const [file, setFile] = useState(null)
  const [response, setResponse] = useState("")
  const [loading, setLoading] = useState(false)

  const handleUpload = async () => {
    if (!file) return alert("ファイルを選択してください")

    const formData = new FormData()
    formData.append("file", file)

    setLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      setResponse(res.data)
    } catch (err) {
      console.error(err)
      setResponse("エラーが発生しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h2>名刺画像アップロード</h2>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "送信中..." : "アップロードして解析"}
      </button>
      <div style={{ marginTop: "1rem" }}>
        <strong>結果:</strong>
        <pre>{response}</pre>
      </div>
    </div>
  )
}

export default App
