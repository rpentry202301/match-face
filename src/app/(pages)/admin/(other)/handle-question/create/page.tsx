"use client";
import { department } from "@/const/userList";
import Input from "@/components/ui/Input";
import { useState } from "react";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton";
import Link from "next/link";
import type { ChangeEvent } from "react";
import type { Question } from "@/const/projectTable";

const CreateQuestionPage = () => {
  const [projectName, setProjectName] = useState("");
  const [projectDetail, setProjectDetail] = useState("");
  const [projectDepartment, setDepartment] = useState("");
  const [editData, setEditData] = useState<Question[]>([]);
  const [newID, setNewId] = useState<number>(1);

  const addWriteQuestion = () => {
    setEditData([
      ...editData,
      {
        question_id: newID,
        question:
          "問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１問題文１",
        answer_example:
          "問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例問題文１の回答例",
        answer: "",
        choices: [],
        select: false,
      },
    ]);
    setNewId(newID + 1);
  };

  const addSelectQuestion = () => {
    setEditData([
      ...editData,
      {
        question_id: newID,
        question:
          "問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３問題文３",
        answer_example: "",
        answer: "選択肢2",
        choices: ["選択肢1", "選択肢2", "選択肢3", "選択肢4"],
        select: true,
      },
    ]);
    setNewId(newID + 1);
  };

  const handleQuestionDelete = (index: number) => {
    const updatedData = [...editData];
    updatedData.splice(index, 1);
    setEditData(updatedData);
  };

  const sendData = () => {
    const getDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      if (month < 10 && day < 10) {
        return `${year}-0${month}-0${day}`;
      } else if (month < 10) {
        return `${year}-0${month}-${day}`;
      } else if (day < 10) {
        return `${year}-${month}-0${day}`;
      } else {
        return `${year}-${month}-${day}`;
      }
    };
    const sendJSON = {
      project_name: projectName,
      project_detail: projectDetail,
      questions: editData,
      edit_date: getDate(),
      department: projectDepartment,
    };
    console.log(sendJSON);
  };

  const handleQuestionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedData = [...editData];
    updatedData[index].question = e.target.value;
    setEditData(updatedData);
  };

  const handleAnswerExampleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedData = [...editData];
    updatedData[index].answer_example = e.target.value;
    setEditData(updatedData);
  };

  const handleChoiceChange = (
    e: ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    choiceIndex: number
  ) => {
    const updatedData = [...editData];
    if (
      updatedData[questionIndex]?.choices &&
      updatedData[questionIndex]?.choices !== undefined
    ) {
      updatedData[questionIndex].choices[choiceIndex] = e.target.value;
      setEditData(updatedData);
    }
  };

  const handleAnswerChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedData = [...editData];
    updatedData[index].answer = e.target.value;
    setEditData(updatedData);
  };
  return (
    <div className="flex flex-col items-center my-20 w-4/5 mx-auto h-auto">
      <div className="w-2/3">
        <div className="flex items-end justify-between border-b-2 border-black pb-3">
          <h1 className="text-3xl">質問・回答例の作成</h1>
        </div>
        <div className="my-8">
          <div className="flex items-center">
            <h2 className="text-2xl">部署選択：</h2>
            <select
              name="department"
              id="department"
              className="border-deep-gray"
              defaultValue="Java"
              onChange={(e) => setDepartment(e.target.value)}
            >
              {department.map((data, index) => {
                return (
                  <option
                    value={`${data.department}`}
                    key={index}
                    className="border-deep-gray"
                  >
                    {data.department}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="flex items-center my-5">
            <h2 className="text-2xl">案件名：</h2>
            <Input
              name="project_name"
              id="project_name"
              className="border-deep-gray pl-1 w-96"
              onChange={(e) => setProjectName(e.target.value)}
            />
          </div>
          <label htmlFor="project_detail" className="my-3 text-2xl">
            案件詳細
          </label>
          <textarea
            name="project_detail"
            id="project_detail"
            className="border-deep-gray border p-1 w-full"
            rows={5}
            onChange={(e) => setProjectDetail(e.target.value)}
          ></textarea>
        </div>
      </div>
      {/* <QuestionList questions={questions} /> */}
      {editData.map((data, index) => {
        if (data.select === false) {
          return (
            <div
              key={data.question_id}
              className="flex flex-col w-2/3 my-5 border-b border-black pb-16 border-dashed"
            >
              <h2
                className="text-2xl"
                data-testid={`write_${data.question_id}`}
              >
                Q{index + 1}.
              </h2>
              <textarea
                name="question"
                id="question"
                value={data.question}
                className="border-deep-gray border  p-1 mt-2"
                rows={5}
                onChange={(e) => handleQuestionChange(e, index)}
              ></textarea>
              <label htmlFor="answer_ex" className="my-3 text-2xl">
                回答例
              </label>
              <textarea
                name="answer_ex"
                id="answer_ex"
                value={data.answer_example}
                className="border-deep-gray border p-1"
                rows={5}
                onChange={(e) => handleAnswerExampleChange(e, index)}
              ></textarea>
              <WhiteButton
                label="削除"
                className="w-20 text-xs py-1 mx-auto mt-5"
                onClick={() => handleQuestionDelete(index)}
              />
            </div>
          );
        } else if (data.select === true) {
          return (
            <div
              key={data.question_id}
              className="flex flex-col w-2/3 my-5 border-b border-black pb-16 border-dashed"
            >
              <h2
                className="text-2xl"
                data-testid={`select_${data.question_id}`}
              >
                Q{index + 1}.
              </h2>
              <textarea
                name="question"
                id="question"
                value={data.question}
                className="border-deep-gray border p-1 mt-2"
                rows={5}
                onChange={(e) => handleQuestionChange(e, index)}
              ></textarea>
              {data.choices?.map((select, choiceIndex) => {
                return (
                  <div key={choiceIndex} className="flex mt-5">
                    <label htmlFor={`select${index}`}>選択肢{index + 1}:</label>
                    <Input
                      id={`select${index}`}
                      value={select}
                      key={index}
                      className="border-deep-gray pl-1"
                      onChange={(e) =>
                        handleChoiceChange(e, index, choiceIndex)
                      }
                    />
                  </div>
                );
              })}
              <div className="flex mt-5">
                <label htmlFor="answer">回答:</label>
                <select
                  name="answer"
                  id="answer"
                  className="border-deep-gray"
                  defaultValue={data.answer}
                  onChange={(e) => handleAnswerChange(e, index)}
                >
                  {data.choices?.map((select, index) => {
                    return (
                      <option
                        value={`${select}`}
                        key={index}
                        className="border-deep-gray"
                      >
                        {select}
                      </option>
                    );
                  })}
                </select>
              </div>
              <WhiteButton
                label="削除"
                className="w-20 text-xs py-1 mx-auto mt-5"
                onClick={() => handleQuestionDelete(index)}
              />
            </div>
          );
        }
      })}
      <div className="flex flex-col">
        <div className="flex justify-around m-3">
          <WhiteButton
            label="記述質問追加"
            className="m-10"
            onClick={addWriteQuestion}
            data-testid="addWriteButton"
          />
          <WhiteButton
            label="選択質問追加"
            className="m-10"
            onClick={addSelectQuestion}
            data-testid="addSelectButton"
          />
        </div>
        <div className="flex m-3">
          <Link href={`/admin/handle-question`} data-testid="backList">
            <OrangeButton
              label="< 一覧へ戻る"
              className="m-10 rounded-none py-5 flex items-center justify-center"
            />
          </Link>
          <OrangeButton
            label="保存する"
            className="m-10 rounded-none py-5 flex items-center justify-center"
            onClick={sendData}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateQuestionPage;
