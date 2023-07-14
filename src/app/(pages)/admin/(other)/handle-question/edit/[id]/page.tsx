"use client";
import answerEditData from "@/const/answerEdit";
import Input from "@/components/ui/Input";
import { useState } from "react";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton";
import Link from "next/link";
import type { ChangeEvent } from "react";
import type { Question } from "@/const/projectTable";

const EditQuestionPage = () => {
  const data = answerEditData[0];
  const [editData, setEditData] = useState<Question[]>(
    answerEditData[0].questions
  );
  const [newID, setNewId] = useState<number>(editData.length + 1);
  const [errMsg, setErrMsg] = useState("");

  const addWriteQuestion = () => {
    setEditData([
      ...editData,
      {
        question_id: newID,
        question: "",
        answer_example: "",
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
        question: "",
        answer_example: "",
        answer: "",
        choices: ["", "", "", ""],
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
    editData.map((data) => {
      if (data.select === false) {
        if (data.answer_example === "" || data.question === "") {
          setErrMsg("未入力の項目があります");
          return;
        }
      } else {
        if (
          data.answer === "" ||
          data.choices.includes("") ||
          data.question === ""
        ) {
          setErrMsg("未入力の項目があります");
          return;
        }
      }
    });
    if (errMsg !== "") {
      return;
    }
    console.log(editData);
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
      updatedData[questionIndex]?.choices !== undefined &&
      updatedData[questionIndex].choices !== undefined
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
          <h1 className="text-3xl">質問・回答例の編集</h1>
          <p>登録日:{data.edit_date}</p>
        </div>
        <div className="my-8">
          <h2 className="text-2xl">案件名：{data.project_name}</h2>
          <p className="border p-3 mt-2">{data.project_detail}</p>
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
                data-testid={`question_${data.question_id}`}
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
                data-testid={`answer_ex_${data.question_id}`}
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
                data-testid={`question_${data.question_id}`}
              ></textarea>
              {data.choices?.map((select, choiceIndex) => {
                return (
                  <div key={choiceIndex} className="flex mt-5">
                    <label htmlFor={`select${choiceIndex}`}>
                      選択肢{choiceIndex + 1}:
                    </label>
                    <Input
                      id={`select${choiceIndex}`}
                      value={select}
                      key={choiceIndex}
                      className="border-deep-gray pl-1"
                      onChange={(e) =>
                        handleChoiceChange(e, index, choiceIndex)
                      }
                      data-testid={`choice_${choiceIndex + 1}`}
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
                  <option value="">選択してください</option>
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
        <p className="text-center text-red" data-testid="errMsg">
          {errMsg}
        </p>
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
            data-testid="sendButton"
          />
        </div>
      </div>
    </div>
  );
};

export default EditQuestionPage;
