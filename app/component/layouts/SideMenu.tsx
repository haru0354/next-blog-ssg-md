import SideCategory2 from "../side-menu/SideCategory2";
import SideLinks from "../side-menu/SideLinks";
import SideNewArticle2 from "../side-menu/SideNewArticle2";
import SideRecommendArticles from "../side-menu/SideRecommendArticles";

const SideMenu = () => {
  return (
    <div className=" w-full rounded flex flex-col md:w-[300px] mt-8 md:mt-0">
      <SideRecommendArticles/>
      <SideCategory2 />
      <SideNewArticle2 />
      <SideLinks />
    </div>
  );
};

export default SideMenu;
