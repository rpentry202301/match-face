import MatchFaceLogo from "@/components/ui/logo/MatchFaceLogo";
import HamburgerBtn from "./button/HamburgerBtn";
import UserIcon from "./nav/UserIcon";

const Header = () => {
  return (
    <div className="flex justify-between py-2 px-3 h-full">
      <MatchFaceLogo />
      {/* UserIconはServerComponentなので、childrenでネストする */}
      <HamburgerBtn>
        <UserIcon />
      </HamburgerBtn>
    </div>
  );
};

export default Header;
