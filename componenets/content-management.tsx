"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "./ui/textarea" 
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Edit, Trash2 } from "lucide-react"

interface FAQ {
  id: string
  question: string
  answer: string
}

interface ContentSection {
  id: string
  title: string
  content: string
}

export function ContentManagement() {
  const [activeTab, setActiveTab] = useState("About Us")
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "How do I make a reservation?",
      answer: "You can make a reservation by visiting our booking page and selecting your prefe..."
    },
    {
      id: "2", 
      question: "What is your cancellation policy?",
      answer: "You can cancel your reservation up to 24 hours before check-in for a full refund."
    }
  ])

  const [contentSections, setContentSections] = useState<ContentSection[]>([
    {
      id: "about",
      title: "About Us",
      content: "Welcome to Reserveit, your premier destination for comfortable and affordable accommodations. We pride ourselves on providing exceptional service and memorable experiences for all our guests."
    },
    {
      id: "terms",
      title: "Terms & Conditions", 
      content: "Terms and conditions content will be displayed here..."
    },
    {
      id: "blog",
      title: "Blog",
      content: "Blog content will be displayed here..."
    }
  ])

  const [isAddFaqModalOpen, setIsAddFaqModalOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null)
  const [newFaq, setNewFaq] = useState({
    question: "",
    answer: ""
  })

  const tabs = ["FAQs", "About Us", "Terms & Conditions", "Blog"]

  const handleAddFaq = () => {
    if (!newFaq.question || !newFaq.answer) {
      alert("Please fill in both question and answer")
      return
    }

    const faq: FAQ = {
      id: Date.now().toString(),
      question: newFaq.question,
      answer: newFaq.answer
    }

    setFaqs([...faqs, faq])
    setNewFaq({ question: "", answer: "" })
    setIsAddFaqModalOpen(false)
  }

  const handleEditFaq = (faq: FAQ) => {
    setEditingFaq(faq)
    setNewFaq({ question: faq.question, answer: faq.answer })
    setIsAddFaqModalOpen(true)
  }

  const handleUpdateFaq = () => {
    if (!editingFaq || !newFaq.question || !newFaq.answer) {
      alert("Please fill in both question and answer")
      return
    }

    setFaqs(faqs.map(faq => 
      faq.id === editingFaq.id 
        ? { ...faq, question: newFaq.question, answer: newFaq.answer }
        : faq
    ))
    setNewFaq({ question: "", answer: "" })
    setEditingFaq(null)
    setIsAddFaqModalOpen(false)
  }

  const handleDeleteFaq = (id: string) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      setFaqs(faqs.filter(faq => faq.id !== id))
    }
  }

  const handleSaveContent = (sectionId: string, content: string) => {
    setContentSections(contentSections.map(section =>
      section.id === sectionId 
        ? { ...section, content }
        : section
    ))
    alert("Changes saved successfully!")
  }

  const getCurrentContent = () => {
    const section = contentSections.find(s => s.title === activeTab)
    return section?.content || ""
  }

  const getCurrentSectionId = () => {
    const section = contentSections.find(s => s.title === activeTab)
    return section?.id || ""
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Content Management</h2>
        </div>
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Online
        </div>
      </div>

      <div className="mb-6">
        <div className="text-sm text-gray-600 mb-4">
          CMS → Content
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === "FAQs" ? (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Frequently Asked Questions</CardTitle>
            <Button 
              onClick={() => setIsAddFaqModalOpen(true)} 
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-1/3">Question</TableHead>
                  <TableHead className="w-1/2">Answer</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {faqs.map((faq) => (
                  <TableRow key={faq.id}>
                    <TableCell className="font-medium">{faq.question}</TableCell>
                    <TableCell className="truncate max-w-xs">{faq.answer}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleEditFaq(faq)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDeleteFaq(faq.id)}
                        >
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
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>{activeTab} Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={getCurrentContent()}
              onChange={(e) => {
                const sectionId = getCurrentSectionId()
                setContentSections(contentSections.map(section =>
                  section.id === sectionId 
                    ? { ...section, content: e.target.value }
                    : section
                ))
              }}
              rows={8}
              className="w-full"
              placeholder={`Enter ${activeTab.toLowerCase()} content here...`}
            />
            <Button 
              onClick={() => handleSaveContent(getCurrentSectionId(), getCurrentContent())}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add/Edit FAQ Modal */}
      <Dialog open={isAddFaqModalOpen} onOpenChange={setIsAddFaqModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingFaq ? "Edit FAQ" : "Add FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Question</label>
              <Input
                placeholder="Enter the question..."
                value={newFaq.question}
                onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Answer</label>
              <Textarea
                placeholder="Enter the answer..."
                value={newFaq.answer}
                onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                rows={4}
              />
            </div>
            <div className="flex items-center gap-3 pt-4">
              <Button 
                onClick={editingFaq ? handleUpdateFaq : handleAddFaq}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {editingFaq ? "Update" : "Add"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsAddFaqModalOpen(false)
                  setEditingFaq(null)
                  setNewFaq({ question: "", answer: "" })
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