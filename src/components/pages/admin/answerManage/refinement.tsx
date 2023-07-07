import WhiteButton from "@/components/ui/button/WhiteButton";
import WhiteCheckButton from "@/components/ui/button/WhiteCheckButton";
import OrangeButton from "@/components/ui/button/OrangeButton";
import Input from "@/components/ui/Input";

const Refinement = () => {
  return (
    <div className="border-2 flex flex-col items-center w-5/12 max-w-5/12">
      <div className="mt-7 flex items-center w-4/5 ">
        <div className=" w-4/5">
          <Input id="search" className="w-full pl-1" />
        </div>
        <div className=" w-1/5 flex justify-end">
          <WhiteButton label="検索" className="text-xs py-1 px-5" />
        </div>
      </div>
      <div className="mt-7 flex w-4/5 justify-between">
        <WhiteCheckButton label="Java" className="text-xs py-1 px-5" />
        <WhiteCheckButton label="PHP" className="text-xs py-1 px-5" />
        <WhiteCheckButton label="FR" className="text-xs py-1 px-5" />
        <WhiteCheckButton label="CL" className="text-xs py-1 px-5" />
        <WhiteCheckButton label="ML" className="text-xs py-1 px-5" />
        <WhiteCheckButton label="QA" className="text-xs py-1 px-5" />
      </div>
      <OrangeButton
        label="絞り込み"
        className="rounded-none text-xs py-1 px-5 w-auto my-7 active:rounded-none active:text-xs active:py-1 active:px-5 active:w-auto active:my-7"
      />
    </div>
  );
};

export default Refinement;
