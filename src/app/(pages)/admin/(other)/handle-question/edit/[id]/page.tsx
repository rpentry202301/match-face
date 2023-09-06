"use client";
import Input from "@/components/ui/Input";
import { useState, useEffect } from "react";
import OrangeButton from "@/components/ui/button/OrangeButton";
import WhiteButton from "@/components/ui/button/WhiteButton";
import Link from "next/link";
import type { ChangeEvent } from "react";
import {
  Questions,
  ProjectResponse,
  ProjectDetail,
  Answer,
  initialProjectDetail,
} from "@/const/projectTable";

type Question = {
  id: number;
  question: string;
  answer_example: string;
  answer: string;
  choices: string[];
  select: boolean;
};

const user = "test";
const userID = 1;

const EditQuestionPage = ({ params }: { params: { id: string } }) => {
  // const data = answerEditData[0];
  const [projectData, setProjectData] =
    useState<ProjectDetail>(initialProjectDetail);
  const [editData, setEditData] = useState<Questions[]>([]);
  const [newID, setNewId] = useState<number>(1);
  const [errMsg, setErrMsg] = useState("");

  const [newQuestion, setNewQuestion] = useState<Question[]>([]);

  const datePortion = projectData.createdAt.split("T")[0];
  const [year, month, day] = datePortion.split("-");
  const formattedDate = `${year}/${parseInt(month)}/${parseInt(day)}`;

  useEffect(() => {
    const getData = async (url: string): Promise<ProjectDetail> => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response not OK");
        }
        const res: ProjectResponse = await response.json();
        // console.log(res.project)
        return res.project;
      } catch (error) {
        console.error(error);
        return initialProjectDetail;
      }
    };
    getData(
      "http://localhost:8080/qa_system_api/projects/${Number(params.id)}"
    ).then((projectDetails) => {
      setProjectData(projectDetails);
      setEditData(projectDetails.questionList);
      setNewId(projectDetails.questionList.length + 1);
    });
  }, [params]);

  const addWriteQuestion = () => {
    setNewQuestion([
      ...newQuestion,
      {
        id: newID,
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
    setNewQuestion([
      ...newQuestion,
      {
        id: newID,
        question: "",
        answer_example: "",
        answer: "",
        choices: ["", "", "", ""],
        select: true,
      },
    ]);
    setNewId(newID + 1);
  };

  const sendData = async () => {
    editData.map((data) => {
      if (data.choiceList.length === 0) {
        if (
          data.answerList[0].context.trim() === "" ||
          data.context.trim() === ""
        ) {
          setErrMsg("未入力の項目があります");
          return;
        }
      } else {
        if (
          data.answerList[0].context.trim() === "" ||
          data.choiceList.some((choice) => choice.context.trim() === "") ||
          data.context.trim() === ""
        ) {
          setErrMsg("未入力の項目があります");
          return;
        }
      }
    });
    newQuestion.map((data) => {
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

    // for (const data of editData) {
    //   await fetch(
    //     `http://localhost:8080/qa_system_api/projects/${projectData.id}/update`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         administratorId: userID,
    //         projectName: "test",
    //         projectDetail: "test",
    //         questions: ["test"],
    //         choices: ["test", "test", "test", "test"],
    //         answers: ["test"],
    //       }),
    //     }
    //   );
    // // 選択肢更新
    // for (const choice of data.choiceList) {
    //   await fetch(`http://localhost:8080/qa_system_api/choices/${choice.id}`, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       context: choice.context,
    //       update_user: user,
    //       update_at: new Date().toISOString(),
    //     }),
    //   });
    // }
    // }

    // newQuestionのデータを新規作成
    // for (const question of newQuestion) {
    //   const response = await fetch(`http://localhost:8080/qa_system_api/questions`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       project_id: projectData.id,  // ここは適切なプロジェクトIDに変更する必要があります
    //       context: question.question,
    //       created_user: user,
    //       created_at: new Date().toISOString(),
    //       update_user: user,
    //       update_at: new Date().toISOString(),
    //     }),
    //   });
    //   const newQuestionData = await response.json();  // 新しく作成されたデータのIDを取得

    //   // 選択肢も新規作成
    //   for (const choice of question.choices) {
    //     await fetch(`http://localhost:8080/qa_system_api/choices`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         context: choice,
    //         question_id: newQuestionData.id,  // 新しく作成された質問のIDを使用
    //         created_user: user,
    //         created_at: new Date().toISOString(),
    //         update_user: user,
    //         update_at: new Date().toISOString(),
    //       }),
    //     });
    //   }
    // }
  };

  // 取得したデータ
  const handleQuestionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedData = [...editData];
    updatedData[index].context = e.target.value;
    setEditData(updatedData);
  };

  const handleAnswerExampleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedData = [...editData];
    updatedData[index].answerList[0].context = e.target.value;
    setEditData(updatedData);
  };

  const handleChoiceChange = (
    e: ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    choiceIndex: number
  ) => {
    const updatedData = [...editData];
    if (
      updatedData[questionIndex]?.choiceList.length !== 0 &&
      updatedData[questionIndex].choiceList.length !== 0
    ) {
      updatedData[questionIndex].choiceList[choiceIndex].context =
        e.target.value;
      setEditData(updatedData);
    }
  };

  const handleAnswerChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedData = [...editData];
    updatedData[index].answerList[0].context = e.target.value;
    setEditData(updatedData);
  };

  const handleQuestionDelete = (index: number) => {
    const updatedData = [...editData];
    updatedData.splice(index, 1);
    setEditData(updatedData);
  };

  // 新しく作成したデータ
  const handleNewQuestionChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedData = [...newQuestion];
    updatedData[index].question = e.target.value;
    setNewQuestion(updatedData);
  };

  const handleNewAnswerExampleChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const updatedData = [...newQuestion];
    updatedData[index].answer_example = e.target.value;
    setNewQuestion(updatedData);
  };

  const handleNewChoiceChange = (
    e: ChangeEvent<HTMLInputElement>,
    questionIndex: number,
    choiceIndex: number
  ) => {
    const updatedData = [...newQuestion];
    if (
      updatedData[questionIndex]?.choices !== undefined &&
      updatedData[questionIndex].choices !== undefined
    ) {
      updatedData[questionIndex].choices[choiceIndex] = e.target.value;
      setNewQuestion(updatedData);
    }
  };

  const handleNewAnswerChange = (
    e: ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedData = [...newQuestion];
    updatedData[index].answer = e.target.value;
    setNewQuestion(updatedData);
  };

  const handleNewQuestionDelete = (index: number) => {
    const updatedData = [...newQuestion];
    updatedData.splice(index, 1);
    setNewQuestion(updatedData);
  };

  return (
    <div className="flex flex-col items-center my-20 w-4/5 mx-auto h-auto">
      <div className="w-2/3">
        <div className="flex items-end justify-between border-b-2 border-black pb-3">
          <h1 className="text-3xl">質問・回答例の編集</h1>
          <p>登録日:{formattedDate}</p>
        </div>
        <div className="my-8">
          <h2 className="text-2xl">案件名：{projectData.name}</h2>
          <p className="border p-3 mt-2">{projectData.detail}</p>
        </div>
      </div>
      {/* 取得データ */}
      {editData.map((data, index) => {
        if (data.choiceList.length === 0) {
          return (
            <div
              key={index}
              className="flex flex-col w-2/3 my-5 border-b border-black pb-16 border-dashed"
            >
              <h2 className="text-2xl" data-testid={`write_${data.id}`}>
                Q{index + 1}.
              </h2>
              <textarea
                name="question"
                id="question"
                value={data.context}
                className="border-deep-gray border  p-1 mt-2"
                rows={5}
                onChange={(e) => handleQuestionChange(e, index)}
                data-testid={`question_${data.id}`}
              ></textarea>
              <label htmlFor="answer_ex" className="my-3 text-2xl">
                回答例
              </label>
              <textarea
                name="answer_ex"
                id="answer_ex"
                value={data.answerList[0].context}
                className="border-deep-gray border p-1"
                rows={5}
                onChange={(e) => handleAnswerExampleChange(e, index)}
                data-testid={`answer_ex_${data.id}`}
              ></textarea>
              <WhiteButton
                label="削除"
                className="w-20 text-xs py-1 mx-auto mt-5"
                onClick={() => handleQuestionDelete(index)}
              />
            </div>
          );
        } else if (data.choiceList.length !== 0) {
          return (
            <div
              key={index}
              className="flex flex-col w-2/3 my-5 border-b border-black pb-16 border-dashed"
            >
              <h2 className="text-2xl" data-testid={`select_${data.id}`}>
                Q{index + 1}.
              </h2>
              <textarea
                name="question"
                id="question"
                value={data.context}
                className="border-deep-gray border p-1 mt-2"
                rows={5}
                onChange={(e) => handleQuestionChange(e, index)}
                data-testid={`question_${data.id}`}
              ></textarea>
              {data.choiceList?.map((select, choiceIndex) => {
                return (
                  <div key={choiceIndex} className="flex mt-5">
                    <label htmlFor={`select${choiceIndex}`}>
                      選択肢{choiceIndex + 1}:
                    </label>
                    <Input
                      id={`select${choiceIndex}`}
                      value={select.context}
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
                  defaultValue={data.answerList[0].context}
                  onChange={(e) => handleAnswerChange(e, index)}
                >
                  <option value="">選択してください</option>
                  {data.choiceList?.map((select, index) => {
                    return (
                      <option
                        value={`${select.context}`}
                        key={index}
                        className="border-deep-gray"
                      >
                        {select.context}
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
      {/* 新規データ */}
      {newQuestion.map((data, index) => {
        if (data.select === false) {
          return (
            <div
              key={index}
              className="flex flex-col w-2/3 my-5 border-b border-black pb-16 border-dashed"
            >
              <h2 className="text-2xl" data-testid={`write_${data.id}`}>
                Q{data.id}.
              </h2>
              <textarea
                name="question"
                id="question"
                value={data.question}
                className="border-deep-gray border  p-1 mt-2"
                rows={5}
                onChange={(e) => handleNewQuestionChange(e, index)}
                data-testid={`question_${data.id}`}
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
                onChange={(e) => handleNewAnswerExampleChange(e, index)}
                data-testid={`answer_ex_${data.id}`}
              ></textarea>
              <WhiteButton
                label="削除"
                className="w-20 text-xs py-1 mx-auto mt-5"
                onClick={() => handleNewQuestionDelete(index)}
              />
            </div>
          );
        } else if (data.select === true) {
          return (
            <div
              key={index}
              className="flex flex-col w-2/3 my-5 border-b border-black pb-16 border-dashed"
            >
              <h2 className="text-2xl" data-testid={`select_${data.id}`}>
                Q{data.id}.
              </h2>
              <textarea
                name="question"
                id="question"
                value={data.question}
                className="border-deep-gray border p-1 mt-2"
                rows={5}
                onChange={(e) => handleNewQuestionChange(e, index)}
                data-testid={`question_${data.id}`}
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
                        handleNewChoiceChange(e, index, choiceIndex)
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
                  onChange={(e) => handleNewAnswerChange(e, index)}
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
                onClick={() => handleNewQuestionDelete(index)}
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
