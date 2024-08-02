import Header from "/src/layouts/Header";
import Slider from "/src/layouts/Slider";
import Category from "/src/layouts/Category";
import Groups from "/src/layouts/Groups";
import AsideButton from "/src/layouts/AsideButton";
import Footer from "/src/layouts/Footer";

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
