'use client'
import CheckBox from "@/components/ui/checkbox/CheckBox"
import { ChangeEvent } from "react"

type Question = {
  id: number,
  projectId: number,
  projectName: string,
  context: string,
  updateAt: string,
}

const QuestionList = ({
  questions,
  checkedValues,
  onChange
}: {
  questions: Question[],
  checkedValues: string[],
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  const tableDefaultClassName = "border-2 border-deep-gray px-4 py-2 text-center"
  return (
    <div className="w-full mx-auto">
      <table className="border-collapse border-2 border-deep-gray text-sm mx-auto w-full">
        <thead className="bg-light-gray">
          <tr>
            <th className={`${tableDefaultClassName} w-1/12`}></th>
            <th className={`${tableDefaultClassName} w-2/12`}>最終編集日</th>
            <th className={`${tableDefaultClassName} w-3/12`}>案件名</th>
            <th className={`${tableDefaultClassName}`}>質問内容</th>
          </tr>
        </thead>
          <tbody>
            {questions.map((question) => (
              <tr key={`qId_${question.id}`}>
                <td className={`${tableDefaultClassName}`}>
                  <CheckBox
                    value={question.context}
                    onChange={onChange}
                    checked={checkedValues.includes(question.context)}
                  />
                </td>
                <td className={`${tableDefaultClassName}`}>{question.updateAt.slice(0, 10)}</td>
                <td className={`${tableDefaultClassName}`}>{question.projectName}</td>
                <td className={`${tableDefaultClassName}`}>{question.context}</td>
              </tr>
            ))}
          </tbody>
      </table>
    </div>
  )
}

export default QuestionList
