import { useState, useEffect, useRef, useCallback } from "react";

// 외부 API에서 데이터를 가져오는 비동기 함수
const fetchMoreData = async (page: number, limit: number) => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
  const newData = await res.json();
  return newData;
};

const InfiniteScrollApi = () => {
  const [data, setData] = useState<any[]>([]); // 데이터를 저장하는 상태
  const [page, setPage] = useState(1); // 현재 페이지 번호를 저장하는 상태
  const [loading, setLoading] = useState(false); // 로딩 상태를 저장하는 상태
  const observerRef = useRef<IntersectionObserver | null>(null); // Intersection Observer 참조를 저장하는 ref
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // 로드 모어 div 참조를 저장하는 ref

  // 더 많은 데이터를 로드하는 함수
  const loadMore = async () => {
    setLoading(true);
    const newPage = page + 1;
    const newData = await fetchMoreData(newPage, 10);
    setData((prevData) => [...prevData, ...newData]);
    setPage(newPage);
    setLoading(false);
  };

  // Intersection Observer의 콜백 함수
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        loadMore();
      }
    },
    [page]
  );

  // 초기 데이터를 로드하는 useEffect
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      const initialData = await fetchMoreData(1, 10);
      setData(initialData);
      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Intersection Observer를 설정하는 useEffect
  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: "20px",
    });

    if (loadMoreRef.current) {
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observerRef.current?.unobserve(loadMoreRef.current);
      }
    };
  }, [handleObserver]);

  return (
    <div>
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
      <div
        ref={loadMoreRef}
        style={{ height: "20px", backgroundColor: "transparent" }}
      />
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default InfiniteScrollApi;
