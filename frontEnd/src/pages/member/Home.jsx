import Header from "/src/components/member/Header";
import Slider from "/src/components/member/Slider";
import Category from "/src/components/member/Category";
import Groups from "/src/components/member/Groups";
import AsideButton from "/src/components/member/AsideButton";
import Footer from "/src/components/member/Footer";

function Home() {
  return (
    <>
      <Slider />
      <Category />
      <Groups />
      <AsideButton />
    </>
  );
}
export default Home;
