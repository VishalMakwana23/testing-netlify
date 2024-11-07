import BlogsIcon from "../../assets/icons/grayIcon/black-blog.svg";
import BriefsIcon from "../../assets/icons/grayIcon/black-brief.svg";
import CopyLinkIcon from "../../assets/icons/postActionIcons/CopyLinkIcon.svg";
import ReportIcon from "../../assets/icons/postActionIcons/ReportIcon.svg";
import SaveIcon from "../../assets/icons/postActionIcons/SaveIcon.svg";
import user from "../../assets/icons/user.png";
import TestPost from "../../assets/icons/gallery/gallery5.jpeg";


export const hashTagData = [
    "#foryou",
    "#food",
    "#bbq",
    "#chicken",
    "#popular",
    "#dinner",
]

export const categoryData = ["Vegetarian", "Wheat", "Eggs"]

export const AddMenu = [
    { name: "Add New Blog", value: "Add New Blog", icon: BlogsIcon },
    { name: "Add New Briefs", value: "Add New Briefs", icon: BriefsIcon },
];

export const postActionMenu = [
    { name: "Copy Link", value: "Copy Link", icon: CopyLinkIcon },
    { name: "Save Blog", value: "Save Blog", icon: SaveIcon },
    { name: "Report Blog", value: "Report Blog", icon: ReportIcon },
]

export const notificationData = [
    { userImage: user, actionImage: TestPost, userName: "Eleanor Pena", description: "is added like on your brief. 23m" },
    { userImage: user, actionImage: TestPost, userName: "Jerome Bell", description: "is added like on your blog. 23m" },
    { userImage: user, actionImage: TestPost, userName: "Eleanor Pena", description: "is added like on your brief. 23m" },
]