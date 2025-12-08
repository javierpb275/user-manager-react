import { useEffect, useRef } from "react";

export function useInfiniteScroll(
  onLoadMore: () => void,
  canLoadMore: boolean
) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && canLoadMore) {
        onLoadMore();
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [onLoadMore, canLoadMore]);
  return ref;
}
