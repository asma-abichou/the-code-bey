import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { Link } from "react-router-dom";

const Widget = ({ type ,number}) => {
  let data;

  //temporary
  const counter = number;

  switch (type) {
    case "student":
      data = {
        title: "STUDENTS",
        linkName: "See all students",
        link: "students",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
      case "teacher":
      data = {
        title: "TEACHERS",
        linkName: "See all teachers",
        link: "teachers",
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 124, 0.2)",
            }}
          />
        ),
      };
      break;
    case "course":
      data = {
        title: "COURSES",
        linkName: "See all details",
        link: "courses",
        icon: (
          <LibraryBooksOutlinedIcon
            className="icon"
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
        {counter}
        </span>
        <Link to={data.link}><span className="link">{data.linkName}</span>
        </Link>
        
      </div>
      <div className="right">
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;