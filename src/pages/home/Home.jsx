import "./style.scss";
import HeroBanner from "./heroBanner/HeroBanner";
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRared from "./topRared/TopRared";
const Home = () => {
  return (
    <div className="">
      <HeroBanner />
      <Trending />
      <Popular />
      <TopRared />
    </div>
  );
};

export default Home;
