"use client";

import InfiniteScroll from "../components/InfiniteScroll";
import InfiniteScrollApi from "../components/InfiniteScrollApi";

const Home = () => {
  return (
    <div>
      <h1>무한 스크롤 예제</h1>

      {/* text data example */}
      {/* <InfiniteScroll /> */}

      {/* dummy json data example */}
      <InfiniteScrollApi />
    </div>
  );
};

export default Home;
