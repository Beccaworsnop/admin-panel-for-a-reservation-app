"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"

interface MarginRule {
  id: string
  fromNights: number
  toNights: number
  marginPercent: number
}

export function SettingsManagement() {
  const [marginRules, setMarginRules] = useState<MarginRule[]>([
    { id: "1", fromNights: 1, toNights: 3, marginPercent: 15 },
    { id: "2", fromNights: 4, toNights: 7, marginPercent: 20 },
    { id: "3", fromNights: 8, toNights: 14, marginPercent: 25 },
  ])

  const [isAddRuleModalOpen, setIsAddRuleModalOpen] = useState(false)
  const [editingRule, setEditingRule] = useState<MarginRule | null>(null)
  const [newRule, setNewRule] = useState({
    fromNights: "",
    toNights: "",
    marginPercent: "",
  })

  const handleAddRule = () => {
    const from = Number.parseInt(newRule.fromNights)
    const to = Number.parseInt(newRule.toNights)
    const margin = Number.parseInt(newRule.marginPercent)

    if (!from || !to || !margin || margin < 0 || margin > 100) {
      alert("Please fill in all fields correctly. Margin must be between 0-100%")
      return
    }

    if (from >= to) {
      alert("From nights must be less than To nights")
      return
    }

    const rule: MarginRule = {
      id: Date.now().toString(),
      fromNights: from,
      toNights: to,
      marginPercent: margin,
    }

    setMarginRules([...marginRules, rule])
    setNewRule({ fromNights: "", toNights: "", marginPercent: "" })
    setIsAddRuleModalOpen(false)
  }

  const handleDeleteRule = (id: string) => {
    if (window.confirm("Are you sure you want to delete this rule?")) {
      setMarginRules(marginRules.filter((rule) => rule.id !== id))
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
          <p className="text-gray-600 mt-1">Manage margin configuration rules</p>
        </div>
        <Button onClick={() => setIsAddRuleModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Rule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Margin Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nights Range</TableHead>
                <TableHead>Margin %</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marginRules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell>
                    {rule.fromNights} - {rule.toNights} nights
                  </TableCell>
                  <TableCell>{rule.marginPercent}%</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button size="sm" variant="outline">
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

      {/* Add Rule Modal */}
      <Dialog open={isAddRuleModalOpen} onOpenChange={setIsAddRuleModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Margin Rule</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">From nights</label>
              <Input
                type="number"
                placeholder="1"
                value={newRule.fromNights}
                onChange={(e) => setNewRule({ ...newRule, fromNights: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">To nights</label>
              <Input
                type="number"
                placeholder="7"
                value={newRule.toNights}
                onChange={(e) => setNewRule({ ...newRule, toNights: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Margin % (0-100)</label>
              <Input
                type="number"
                placeholder="20"
                min="0"
                max="100"
                value={newRule.marginPercent}
                onChange={(e) => setNewRule({ ...newRule, marginPercent: e.target.value })}
              />
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
    </div>
  )
}
