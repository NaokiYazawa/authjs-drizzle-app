"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import { Session } from "next-auth";
import Link from "next/link";

type UserProfileDropdownProps = {
  user: Session["user"];
};

export const UserProfileDropdown = ({ user }: UserProfileDropdownProps) => {
  const [isSignoutLoading, setIsSignoutLoading] = useState(false);

  const nameInitials = user.name
    ?.match(/\b(\w)/g)
    ?.join("")
    .slice(0, 2);

  const handleSignOut = async (e: Event) => {
    e.preventDefault();
    try {
      setIsSignoutLoading(true);
      await signOut({ callbackUrl: "/top" });
    } catch (error) {
      console.error("Failed to sign out:", error);
      setIsSignoutLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="rounded-full" size="icon" variant="ghost">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image ?? ""} alt="user profile image" />
            <AvatarFallback>{nameInitials}</AvatarFallback>
          </Avatar>
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-52">
        <div className="flex p-1">
          <div className="relative">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.image ?? ""} alt="user profile image" />
              <AvatarFallback>{nameInitials}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-[-1px] end-[-1px] bg-background p-0.5 rounded-full">
              <div className="bg-blue-500 rounded-full p-1"></div>
            </div>
          </div>
          <div className="ms-2 max-w-40">
            <div className="text-sm truncate font-medium">{user.name}</div>
            <div className="text-xs truncate text-muted-foreground">
              {user.email}
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <Icons.User className="me-2" />
              プロフィール
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            <Icons.Settings className="me-2" />
            設定
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignOut} disabled={isSignoutLoading}>
          {isSignoutLoading ? (
            <>
              <Icons.Loader2 className="me-2 animate-spin" />
              ログアウト中
            </>
          ) : (
            <>
              <Icons.LogOut className="me-2" />
              ログアウト
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
