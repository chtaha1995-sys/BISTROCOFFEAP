import { useEffect, useState } from "react"
import { supabase } from "./supabase"

export default function App() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("customers")
        .select("*")

      if (error) {
        console.error("ERROR:", error)
      } else {
        console.log("DATA:", data)
        setData(data || [])
      }

      setLoading(false)
    }

    fetchData()
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <h2>Supabase Connected</h2>

      {data.length === 0 && <p>No data yet</p>}

      {data.map((item, index) => (
        <pre key={index}>{JSON.stringify(item, null, 2)}</pre>
      ))}
    </div>
  )
}
