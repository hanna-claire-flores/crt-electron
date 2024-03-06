import React from "react";
import useUserInfo from "src/features/import/hooks/useUserInfo.js";
import useCrtStore from "src/stores/useCrtStore.js";

const UserInfo = () => {
  const tokenData = useCrtStore((s) => s.tokenData);
  const { data: userInfo } = useUserInfo(!!tokenData);

  React.useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <div>
      {userInfo && (
        <div>
          <p>{userInfo.name}</p>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
