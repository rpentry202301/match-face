'use client'
import questionData from "@/const/answerEdit"
import CheckBox from "@/components/ui/checkbox/CheckBox"

const QuestionList = () => {
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
          {questionData.map((projects) => (
            <>
              {projects.questions.map((questions) => (
                <tr key={`userId_${questions.question_id}`}>
                  <td className={`${tableDefaultClassName}`}>
                    <CheckBox />
                  </td>
                  <td className={`${tableDefaultClassName}`}>{projects.edit_date}</td>
                  <td className={`${tableDefaultClassName}`}>{projects.project_name}</td>
                  <td className={`${tableDefaultClassName}`}>{questions.question}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default QuestionList
