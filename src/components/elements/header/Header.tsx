import MatchFaceLogo from "@/components/ui/logo/MatchFaceLogo";
import HumburgerBtn from "./button/HumburgerBtn";

const Header = () => {
  return (
    <div className="flex justify-between py-2 px-3 h-full">
      <MatchFaceLogo />
      <HumburgerBtn />
    </div>
  );
};

export default Header;
