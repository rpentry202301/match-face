import Input from "@/components/ui/Input";
import WhiteButton from "@/components/ui/button/WhiteButton";

const SearchByJobs = () => {
  return (
    <div>
      <div className="flex items-center">
        <Input id="search"/>
        <WhiteButton label="検索" textSize="text-sm"/>
      </div>
      
    </div>
  );
};

export default SearchByJobs;
