"use client";
import SearchBox from "./SearchBox";
import NotificationIcon from "./NotificationIcon";
import UserAvatar from "./UserAvatar";
import Logo from "./Logo";

export default function Header() {
  return (
    <div className="flex items-center justify-between px-6 py-3">
      <div className="flex items-center space-x-4">
        <Logo />
        <div className="text-sm text-gray-600">Enterprise</div>
      </div>

      <div className="flex items-center space-x-4">
        <SearchBox />
        <NotificationIcon />
        <UserAvatar />
      </div>
    </div>
  );
}
