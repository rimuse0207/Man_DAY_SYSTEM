import { useState, useCallback } from "react";

export const useUserSelection = (initialUsers = []) => {
  const [userLists, setUserLists] = useState(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [allChecking, setAllChecking] = useState(false);

  const handleUserToggle = useCallback((targetUser) => {
    setUserLists((prev) => {
      const nextLists = prev.map((user) =>
        user.email === targetUser.email
          ? { ...user, checked: !user.checked }
          : user,
      );

      const isAllChecked =
        nextLists.length > 0 && nextLists.every((user) => user.checked);
      setAllChecking(isAllChecked);

      return nextLists;
    });

    setSelectedUsers((prev) => {
      const isAlreadySelected = prev.some(
        (item) => item.email === targetUser.email,
      );
      if (isAlreadySelected) {
        return prev.filter((item) => item.email !== targetUser.email);
      } else {
        return [...prev, { ...targetUser, checked: true }];
      }
    });
  }, []);

  const handleAllToggle = useCallback(() => {
    const nextChecking = !allChecking;
    setAllChecking(nextChecking);

    setUserLists((prev) =>
      prev.map((item) => ({ ...item, checked: nextChecking })),
    );

    if (nextChecking) {
      setSelectedUsers((prev) => {
        const prevEmails = prev.map((p) => p.email);
        const newUsers = userLists
          .filter((u) => !prevEmails.includes(u.email))
          .map((u) => ({ ...u, checked: true }));
        return [...prev, ...newUsers];
      });
    } else {
      setSelectedUsers((prev) => {
        const currentEmails = userLists.map((u) => u.email);
        return prev.filter((p) => !currentEmails.includes(p.email));
      });
    }
  }, [allChecking, userLists]);

  const handleClearAll = useCallback(() => {
    setAllChecking(false);
    setUserLists((prev) => prev.map((user) => ({ ...user, checked: false })));
    setSelectedUsers([]);
  }, []);

  return {
    userLists,
    setUserLists,
    selectedUsers,
    setSelectedUsers,
    allChecking,
    setAllChecking,
    handleUserToggle,
    handleAllToggle,
    handleClearAll,
  };
};
