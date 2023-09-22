'use client'
import Input from "@/components/ui/Input"
import { useSelectedQuestion } from "@/hooks/store/context/SelectedQuestionContext"

const QuestionInput = () => {
  const [ selectedQuestion ] = useSelectedQuestion()
  const omission = selectedQuestion.list.map((question) => {
    if (question.name.length > 10) {
      return question.name.slice(0, 10) + "..."
    } else {
      return question.name
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
