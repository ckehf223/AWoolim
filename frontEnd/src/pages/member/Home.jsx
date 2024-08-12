import Header from "/src/components/member/Header";
import Slider from "/src/components/member/Slider";
import Category from "/src/components/member/Category";
import Groups from "/src/components/member/Groups";
import Footer from "/src/components/member/Footer";

function Home() {
  return (
    <>
      <Slider />
      <Category />
      <Groups />
    </>
  );
}
export default Home;
