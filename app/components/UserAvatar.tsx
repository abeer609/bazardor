import { User, UserRound } from "lucide-react";

const UserAvatar = ({ url }: { url?: string | null }) => {
  return url ? (
    <div className="w-9 h-9 shrink-0 rounded-md overflow-hidden">
      <img src={url} alt="" className="w-full h-full object-cover" />
    </div>
  ) : (
    <UserRound className="w-9 h-9" />
  );
};

export default UserAvatar;
