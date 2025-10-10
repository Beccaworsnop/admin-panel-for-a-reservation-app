"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface MarginRule {
  id: string
  hotelName: string
  marginPercent: number
  applyToAll: boolean
}

export function SettingsManagement() {
  const [marginRules, setMarginRules] = useState<MarginRule[]>([
    { id: "1", hotelName: "All Hotels", marginPercent: 20, applyToAll: true },
    { id: "2", hotelName: "Grand Palace Hotel", marginPercent: 25, applyToAll: false },
    { id: "3", hotelName: "Ocean View Resort", marginPercent: 30, applyToAll: false },
  ])

  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false)
  const [isEditRuleModalOpen, setIsEditRuleModalOpen] = useState(false)
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null)

  const [newRule, setNewRule] = useState({
    hotelName: "",
    marginPercent: "",
    applyToAll: false,
  })

  const handleAddRule = () => {
    const margin = Number.parseInt(newRule.marginPercent)

    if (!newRule.hotelName || !margin || margin < 0 || margin > 100) {
      alert("Please fill in all fields correctly. Margin must be between 0-100%")
      return
    }

    const rule: MarginRule = {
      id: Date.now().toString(),
      hotelName: newRule.hotelName,
      marginPercent: margin,
      applyToAll: newRule.applyToAll,
    }

    setMarginRules([...marginRules, rule])
    setNewRule({ hotelName: "", marginPercent: "", applyToAll: false })
    setIsAddRuleModalOpen(false)
    console.log("[v0] Added new margin rule:", rule)
    alert("Margin rule added successfully!")
  }

  const handleEditRule = (id: string) => {
    const rule = marginRules.find((r) => r.id === id)
    if (rule) {
      setEditingRuleId(id)
      setNewRule({
        hotelName: rule.hotelName,
        marginPercent: rule.marginPercent.toString(),
        applyToAll: rule.applyToAll,
      })
      setIsEditRuleModalOpen(true)
    }
  }

  const handleSaveEdit = () => {
    const margin = Number.parseInt(newRule.marginPercent)

    if (!newRule.hotelName || !margin || margin < 0 || margin > 100) {
      alert("Please fill in all fields correctly. Margin must be between 0-100%")
      return
    }

    setMarginRules(
      marginRules.map((rule) =>
        rule.id === editingRuleId
          ? {
              ...rule,
              hotelName: newRule.hotelName,
              marginPercent: margin,
              applyToAll: newRule.applyToAll,
            }
          : rule,
      ),
    )

    setNewRule({ hotelName: "", marginPercent: "", applyToAll: false })
    setIsEditRuleModalOpen(false)
    setEditingRuleId(null)
    console.log("[v0] Updated margin rule:", editingRuleId)
    alert("Margin rule updated successfully!")
  }

  const handleDeleteRule = (id: string) => {
    if (window.confirm("Are you sure you want to delete this margin rule?")) {
      setMarginRules(marginRules.filter((rule) => rule.id !== id))
      console.log("[v0] Deleted margin rule:", id)
      alert("Margin rule deleted successfully!")
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
          <p className="text-gray-600 mt-1">Manage margin configuration for hotels (applied to purchase price)</p>
        </div>
        <Button onClick={() => setIsAddRuleModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Margin Rule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Hotel Margin Rules</CardTitle>
          <p className="text-sm text-gray-600 mt-2">
            Margin is calculated on purchase price only. Formula: Purchase Price + Margin = Sale Price
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel</TableHead>
                <TableHead>Margin % (on purchase price)</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marginRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.hotelName}</TableCell>
                  <TableCell>{rule.marginPercent}%</TableCell>
                  <TableCell>
                    {rule.applyToAll ? (
                      <span className="text-blue-600 font-medium">All Hotels</span>
                    ) : (
                      <span className="text-gray-600">Specific Hotel</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditRule(rule.id)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isAddRuleModalOpen} onOpenChange={setIsAddRuleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Hotel Margin Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Apply To</label>
              <Select
                value={newRule.applyToAll ? "all" : "specific"}
                onValueChange={(value) => {
                  setNewRule({
                    ...newRule,
                    applyToAll: value === "all",
                    hotelName: value === "all" ? "All Hotels" : "",
                  })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hotels</SelectItem>
                  <SelectItem value="specific">Specific Hotel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!newRule.applyToAll && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Hotel Name</label>
                <Input
                  placeholder="Enter hotel name"
                  value={newRule.hotelName}
                  onChange={(e) => setNewRule({ ...newRule, hotelName: e.target.value })}
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Margin % (applied to purchase price)
              </label>
              <Input
                type="number"
                placeholder="20"
                min="0"
                max="100"
                value={newRule.marginPercent}
                onChange={(e) => setNewRule({ ...newRule, marginPercent: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Example: Purchase Price $100 + 20% Margin = $120 Sale Price</p>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button onClick={handleAddRule} className="bg-blue-600 hover:bg-blue-700">
                Save
              </Button>
              <Button variant="outline" onClick={() => setIsAddRuleModalOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditRuleModalOpen} onOpenChange={setIsEditRuleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Hotel Margin Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Apply To</label>
              <Select
                value={newRule.applyToAll ? "all" : "specific"}
                onValueChange={(value) => {
                  setNewRule({
                    ...newRule,
                    applyToAll: value === "all",
                    hotelName: value === "all" ? "All Hotels" : newRule.hotelName,
                  })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select scope" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Hotels</SelectItem>
                  <SelectItem value="specific">Specific Hotel</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {!newRule.applyToAll && (
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">Hotel Name</label>
                <Input
                  placeholder="Enter hotel name"
                  value={newRule.hotelName}
                  onChange={(e) => setNewRule({ ...newRule, hotelName: e.target.value })}
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Margin % (applied to purchase price)
              </label>
              <Input
                type="number"
                placeholder="20"
                min="0"
                max="100"
                value={newRule.marginPercent}
                onChange={(e) => setNewRule({ ...newRule, marginPercent: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Example: Purchase Price $100 + 20% Margin = $120 Sale Price</p>
            </div>

            <div className="flex items-center gap-3 pt-4">
              <Button onClick={handleSaveEdit} className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditRuleModalOpen(false)
                  setEditingRuleId(null)
                  setNewRule({ hotelName: "", marginPercent: "", applyToAll: false })
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
