import type { TUser } from "../types/user.types";
import UserListCard from "./user-list-card.component";

type Props = {
  users: TUser[];
};

export default function CardList({ users }: Props) {
  return (
    <div className="w-full flex justify-center">
      <div
        className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-6 
          max-w-5xl 
          w-full 
          pt-24  
          pb-10
          px-4
        "
      >
        {users.map((user) => (
          <UserListCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
}
