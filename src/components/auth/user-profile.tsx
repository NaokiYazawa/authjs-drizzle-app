import { Button } from "@/components/ui/button";

import { SigninDialog } from "./signin-dialog";
import { UserProfileDropdown } from "./user-profile-dropdown";
import getSession from "@/lib/session";

export const UserProfile = async () => {
  const session = await getSession();
  if (!session?.user) {
    return (
      <SigninDialog>
        <Button size="sm">ログイン</Button>
      </SigninDialog>
    );
  }

  return <UserProfileDropdown user={session.user} />;
};
