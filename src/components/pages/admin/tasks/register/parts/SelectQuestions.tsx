import QuestionSelectModal from "../QuestionSelectModal ";
import QuestionInput from "./QuestionInput";

const SelectQuestions = () => {
  return (
    <div className="mb-5">
      <div className="flex items-center mb-2">
        <p className="text-base w-40">▶質問を選択する</p>
        <div className="text-xs ml-10">
          <QuestionSelectModal />
        </div>
      </div>
      <div>
        <QuestionInput />
      </div>
    </div>
  );
};

export default SelectQuestions;
