"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

const categories = ["Water Supply", "Electricity", "Road Maintenance", "Sanitation", "Public Transport"]

const COLORS = ["#ff8042", "#00C49F", "#0088FE"]

export default function DistrictPage({ params }) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState("")

  const data = [
    { name: "Pending", value: 30 },
    { name: "In Progress", value: 45 },
    { name: "Resolved", value: 25 },
  ]

  const handleGo = () => {
    if (selectedCategory) {
      router.push(`/category/${params.district}/${selectedCategory}`)
    }
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">{params.district} District Overview</h1>

      <Card>
        <CardHeader>
          <CardTitle>Grievance Status Distribution</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Select Category</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleGo} disabled={!selectedCategory}>
            Go
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

