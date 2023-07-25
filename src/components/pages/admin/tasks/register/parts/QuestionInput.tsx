'use client'
import Input from "@/components/ui/Input"
import { useSelectedQuestion } from "@/hooks/store/context/SelectedQuestionContext"

const QuestionInput = () => {
  const [ selectedQuestion ] = useSelectedQuestion()
  const omission = selectedQuestion.map((question) => {
    if (question.length > 10) {
      return question.slice(0, 10) + "..."
    } else {
      return question
    }
  })
  const questions = omission.reduce((cur, question) => cur + ", " + question, "").slice(2)
  return (
    <Input
      id="search"
      className="border-2 border-light-gray text-xs p-1 w-full"
      value={questions}
      readOnly
    />
  )
}

export default QuestionInput
