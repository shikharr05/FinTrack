import React, { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";
import { Navigate } from "react-router-dom";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  // 1. Wait for user context to load
  if (user === undefined) return null; // render nothing while loading

  // 2. Redirect only if unauthenticated
  if (user === null) return <Navigate to="/login" />;

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />

      <div className="flex">
        <div className="max-[1080px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5">{children}</div>
        {/* basically yehi hai
            children ka kaam. Jo bhi aap <DashboardLayout> ... </DashboardLayout> ke beech likhoge, wo sab children ke through andar aa jayega aur aapke layout mein fit ho jaayega.  basically in future mai jo bhi cheeze wrap krunga in dashboardLayout wo saari cheeze children mai aayengi and successfully fit ho paye is lie we wrote children*/}
      </div>
    </div>
  );
};

export default DashboardLayout;
