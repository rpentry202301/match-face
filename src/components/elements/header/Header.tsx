import MatchFaceLogo from "@/components/ui/logo/MatchFaceLogo";
import HumburgerBtn from "./button/HumburgerBtn";
import UserIcon from "./nav/UserIcon";

const Header = () => {
  return (
    <div className="flex justify-between py-2 px-3 h-full">
      <MatchFaceLogo />
      {/* UserIconはServerComponentなので、childrenでネストする */}
      <HumburgerBtn>
        <UserIcon />
      </HumburgerBtn>
    </div>
  );
};

export default Header;
