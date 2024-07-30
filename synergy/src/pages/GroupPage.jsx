import Header from "/src/layouts/Header";
import Footer from "/src/layouts/Footer";
import GroupMain from "/src/layouts/GroupMain";
import GroupNav from "/src/layouts/GroupNav";
import AsideButton from "/src/layouts/AsideButton";
function GroupPage() {
  return (
    <>
      <Header />
      <GroupMain />
      <GroupNav />
      <AsideButton />
      <Footer />
    </>
  );
}
export default GroupPage;
