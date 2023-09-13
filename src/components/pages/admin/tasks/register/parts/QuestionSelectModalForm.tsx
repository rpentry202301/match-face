"use client";
import { useState, ReactNode, ChangeEvent, FormEvent, useMemo } from "react";
import { createPortal } from "react-dom";
import WhiteButton from "@/components/ui/button/WhiteButton";
import WhiteButtonCheckBox from "./WhiteButtonCheckBox";
import OrangeButton from "@/components/ui/button/OrangeButton";
import CheckBox from "@/components/ui/checkbox/CheckBox";
import QuestionList from "./QuestionList";
import { useSelectedQuestion } from "@/hooks/store/context/SelectedQuestionContext";
import type { FetchQuestionModalData } from "@/types/admin/tasks/register/types";

// 実際にレンダリングされるモーダルは以下に記述
const QuestionSelectModalForm = ({
  fetchData,
}: {
  fetchData: FetchQuestionModalData;
}) => {
  const [search, setSearch] = useState("");
  const [isOpened, setIsOpened] = useState(false);
  const [questions, setQuestions] = useState(fetchData.questions);

  // 状態初期化用にオブジェクトを作成
  const initDepartments = fetchData.departments.map((dep) => {
    return {
      id: dep.id,
      label: dep.name,
      checked: false,
    };
  });

  const initSkills = fetchData.skills.map((skill) => {
    return {
      id: skill.id,
      label: skill.name,
      checked: false,
    };
  });

  const [formData, setFormData] = useState({
    search: "",
    department: initDepartments,
    skill: initSkills,
  });

  const [selectedQuestion, selectedQuestionDispatch] = useSelectedQuestion();
  const [checkedValues, setCheckedValue] = useState<string[]>(selectedQuestion);

  // 選択中のprojectsデータID
  const [activePjId, setActivePjId] = useState(0);

  // 現在の案件に一致する質問データ
  const activePjQuestions = useMemo(() => {
    return questions.filter((question) => question.id === activePjId);
  }, [questions, activePjId]);

  const open = () => {
    setCheckedValue(selectedQuestion);
    setIsOpened(true);
  };
  const close = () => setIsOpened(false);

  const handleChangeCheckBox = (
    e: ChangeEvent<HTMLInputElement>,
    name: "department" | "skill"
  ) => {
    const newData = formData[name];
    newData.map((data) => {
      if (data.label === e.target.value) {
        data.checked = !data.checked;
      }
      return newData;
    });
    setFormData({ ...formData, [name]: newData });
  };

  const handleChangeQuestionList = (e: ChangeEvent<HTMLInputElement>) => {
    if (checkedValues.includes(e.target.value)) {
      setCheckedValue(
        checkedValues.filter((value) => value !== e.target.value)
      );
    } else {
      setCheckedValue([...checkedValues, e.target.value]);
    }
  };

  const handleClose = () => {
    selectedQuestionDispatch({ type: "select", payload: checkedValues });
    close();
  };

  // Todo: APIができたら実装
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchKeyword = search;
    const checkedDepId = formData.department
      .filter((data) => data.checked)
      .map((dep) => dep.id);
    const checkedSkillId = formData.skill
      .filter((data) => data.checked)
      .map((skill) => skill.id);

    const searchQuerys = [
      searchKeyword ? `searchKeyword=${searchKeyword}` : "",
      checkedDepId.length ? `departmentId=${checkedDepId}` : "",
      checkedSkillId.length ? `skillId=${checkedSkillId}` : "",
    ];

    const query = searchQuerys.filter((query) => query !== "").join("&");

    fetch(`/api/admin/tasks/register/questions?${query}`, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res.status);
        return res.json();
      })
      .then((data) => {
        setQuestions(data.questionList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal buttonText="追加" isOpened={isOpened} open={open} close={close}>
      <div className="flex flex-col items-center gap-8 w-full mx-auto">
        <div className="mx-auto">
          <div className="flex flex-col items-start gap-3">
            <div className="text-base">
              <h2>▶️質問を選択する</h2>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col item-center justify-center px-12 py-5 border-2 w-full"
            >
              <div className="flex flex-col items-center gap-5">
                <div>
                  <label htmlFor="project_name" className="text-sm">
                    案件名：
                  </label>
                  <select
                    data-testid="project_name"
                    name="project_name"
                    id="project_name"
                    className="border-2 w-52"
                    onChange={(e) => setActivePjId(Number(e.target.value))}
                  >
                    <option value={0}>{""}</option>
                    {fetchData.projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col items-center gap-5">
                  <div className="flex items-start justify-center gap-2 w-fit">
                    <input
                      id="search"
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="border-light-gray border-2 text-xs p-2 lg:w-96 sm:w-80 w-72"
                      data-testid="search-box"
                    />
                    <WhiteButton label="検索" className="text-xs ml-4 w-16" />
                  </div>
                  <div className="flex items-start gap-4 flex-wrap">
                    {fetchData.departments.map((element) => (
                      <WhiteButtonCheckBox
                        key={`teck_${element.id}`}
                        id={`teck_${element.id}`}
                        label={element.name}
                        value={element.name}
                        checked={
                          formData.department.filter(
                            (data) => data.label === element.name
                          )[0].checked
                        }
                        name="department"
                        className="text-xs w-16"
                        onChange={(e) => handleChangeCheckBox(e, "department")}
                      />
                    ))}
                  </div>
                  <div className="flex mx-auto gap-4">
                    <span className="text-xs">使用技術：</span>
                    <div className="grid xl:grid-cols-7 lg:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-3">
                      {fetchData.skills.map((skill) => (
                        <div key={`skill_${skill.id}`} className="flex">
                          <CheckBox
                            id={`skill_${skill.id}`}
                            value={skill.name}
                            checked={
                              formData.skill.filter(
                                (data) => data.label === skill.name
                              )[0].checked
                            }
                            name="skill"
                            onChange={(e) => handleChangeCheckBox(e, "skill")}
                          />
                          <label
                            htmlFor={`skill_${skill.id}`}
                            className="text-xs ml-1 hover:cursor-pointer"
                          >
                            {skill.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <OrangeButton
                  type="submit"
                  label="絞り込み"
                  className="text-xs"
                />
              </div>
            </form>
          </div>
        </div>

        {activePjId === 0 ? (
          <div>案件名を選択して下さい</div>
        ) : activePjQuestions.length === 0 ? (
          <div>案件名に一致する質問がありません</div>
        ) : (
          <>
            <QuestionList
              questions={activePjQuestions}
              checkedValues={checkedValues}
              onChange={handleChangeQuestionList}
            />

            <OrangeButton
              label="選択完了"
              className="text-xs"
              onClick={handleClose}
            />
          </>
        )}
        {/* <QuestionList
          questions={questions}
          checkedValues={checkedValues}
          onChange={handleChangeQuestionList}
        />

        <OrangeButton
          label="選択完了"
          className="text-xs"
          onClick={handleClose}
        /> */}
      </div>
    </Modal>
  );
};

const Modal = ({
  children,
  buttonText,
  canCloseByClickingBackground = true,
  isOpened,
  open,
  close,
}: {
  children: ReactNode;
  buttonText: string;
  canCloseByClickingBackground?: boolean;
  isOpened: boolean;
  open: () => void;
  close: () => void;
}) => {
  if (!isOpened) {
    return (
      <WhiteButton label={buttonText} onClick={open} className="text-xs" />
    );
  }

  // レンダリングするDOMをbodyに固定するためPortalを使用
  const elmModal = (
    <div className="fixed top-0 left-0 z-30 flex items-center justify-center w-full h-full">
      <div className="relative z-20 w-3/4 max-w-5xl py-7 px-10 bg-white">
        {children}
      </div>
      {canCloseByClickingBackground ? (
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
          onClick={close}
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30" />
      )}
    </div>
  );
  return createPortal(elmModal, document.body);
};

export default QuestionSelectModalForm;
