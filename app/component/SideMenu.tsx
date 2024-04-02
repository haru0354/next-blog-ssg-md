import SideCategory from "./sideMenu/SideCategory";
import SideNewArticle from "./sideMenu/SideNewArticle";

const SideMenu = () => {
  return (
    <div className="px-2 w-full">
      <SideCategory />
      <SideNewArticle />
    </div>
  );
};

export default SideMenu;
