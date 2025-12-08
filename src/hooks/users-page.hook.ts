import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { fetchCombinedUsers } from "../services/user.service";
import type { TUser } from "../types/user.types";
import { useInfiniteScroll } from "./infinite-scroll.hook";

export function useUsersPage() {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    initialPageParam: 1,
    queryFn: ({ pageParam }) => fetchCombinedUsers(pageParam, 10),
    getNextPageParam: (lastPage) => {
      if (!lastPage.page) return undefined;
      return lastPage.page + 1;
    },
  });
  const loadMoreRef = useInfiniteScroll(fetchNextPage, !!hasNextPage);
  const users: TUser[] = useMemo(() => {
    const map = new Map<number, TUser>();
    data?.pages.forEach((page) => {
      page.data.forEach((u) => {
        if (!map.has(u.id)) map.set(u.id, u);
      });
    });
    return Array.from(map.values());
  }, [data]);
  return {
    users,
    loadMoreRef,
    isLoading,
    isError,
    isFetchingNextPage,
  };
}
