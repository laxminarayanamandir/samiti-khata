import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getBaseUrl from "@/lib/getBaseUrl";
import { useRouteContext } from "@tanstack/react-router";
import getTwoLetterNameInitials from "@/lib/getTwoLetterNameInitials";

export default function ProfileAvatar() {
  const { auth } = useRouteContext({ from: "__root__" });

  return (
    <Item className="max-w-60">
      <ItemContent>
        <ItemTitle>{auth.user?.name}</ItemTitle>
        <ItemDescription>{auth.user?.email}</ItemDescription>
      </ItemContent>
      <ItemMedia>
        <Avatar className="size-10">
          <AvatarImage src={`${getBaseUrl()}/${auth.user?.avatar}`} />
          <AvatarFallback>
            {getTwoLetterNameInitials(auth.user?.name || "Samiti Khata")}
          </AvatarFallback>
        </Avatar>
      </ItemMedia>
    </Item>
  );
}
