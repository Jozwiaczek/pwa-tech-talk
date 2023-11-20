import { useCurrentUser } from '@/client/hooks/useCurrentUser';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { ArrowRightOnRectangleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/client/hooks/auth/useAuth';
import { formatDate } from '@/client/utils/formatDate';

export const AccountMenu = () => {
  const { currentUser, removeAccountMutation } = useCurrentUser();
  const { logoutMutation } = useAuth();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="pt-safe-offset-2 pr-safe-offset-4 fixed top-0 right-0 z-50">
      <Dropdown>
        <DropdownTrigger>
          <Avatar
            as="button"
            name={currentUser.username}
            isBordered
            className="size-9 transition-size hover:size-10"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="py-2">
            <p>Signed in as</p>
            <p className="font-bold">{currentUser.username}</p>
            <div className="mt-1">
              <p className="text-xs font-light">
                Created at: {formatDate(currentUser.createdAt, true)}
              </p>
              <p className="text-xs font-light">
                Updated at: {formatDate(currentUser.updatedAt, true)}
              </p>
            </div>
          </DropdownItem>
          <DropdownItem
            color="danger"
            key="remove-account"
            startContent={<TrashIcon className="size-5" />}
            className="text-danger"
            onPress={() => removeAccountMutation.mutate()}
          >
            Remove account
          </DropdownItem>
          <DropdownItem
            key="logout"
            startContent={<ArrowRightOnRectangleIcon className="size-5" />}
            onPress={() => logoutMutation.mutate()}
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
