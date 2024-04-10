import SideCategory2 from "./sideMenu/SideCategory2";
import SideNewArticle2 from "./sideMenu/SideNewArticle2";

const SideMenu = () => {
  return (
    <div className="px-2 w-full rounded flex flex-col  md:w-[300px] mt-4 md:mt-0 ">
      <SideCategory2 />
      <SideNewArticle2 />
    </div>
  );
};

export default SideMenu;
