import { FaUserCog } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
import { TbCalendarClock } from "react-icons/tb";

export const NaviLists = [
  {
    path: "/Home",
    icon: <TbCalendarClock></TbCalendarClock>,
    name: "Home",
    role: "all",
    value: "/Home",
    label: "Home",
  },
  {
    path: "/Man_day",
    icon: <TbCalendarClock></TbCalendarClock>,
    name: "Man_day",
    value: "/Man_day",
    label: "Man_day",
    role: "all",
  },
  {
    path: "/User_Manage",
    icon: <FaUserCog />,
    name: "Admin",
    role: "user",
    value: "/User_Manage",
    label: "Admin",
  },

  {
    path: "/Video_Upload",
    icon: <FaVideo />,
    name: "Video",
    role: "video",
    value: "/Video_Upload",
    label: "Video",
  },
];
