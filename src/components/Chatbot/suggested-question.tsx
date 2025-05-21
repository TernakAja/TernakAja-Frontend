import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

type SuggestedQuestion = {
  id: string
  text: string
  category: string
}

type SuggestedQuestionsProps = {
  questions: SuggestedQuestion[]
  onSelectQuestion: (question: string) => void
}

export default function SuggestedQuestions({ questions, onSelectQuestion }: SuggestedQuestionsProps) {
  return (
    <motion.div
      className="bg-white/90 border-t border-gray-200 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.4 }}
    >
      <div className="max-w-4xl mx-auto">
        <h3 className="text-sm font-medium text-gray-500 mb-3">Suggested questions</h3>
        <div className="flex flex-wrap gap-2">
          {questions.map((question) => (
            <Badge
              key={question.id}
              variant="outline"
              className="bg-[#E1EEBC]/30 hover:bg-[#E1EEBC]/50 text-[#328E6E] border-[#90C67C]/30 cursor-pointer px-3 py-1.5"
              onClick={() => onSelectQuestion(question.text)}
            >
              {question.text}
            </Badge>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
