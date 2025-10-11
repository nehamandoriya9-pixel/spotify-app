import { BsTwitter } from "react-icons/bs";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";

const footerLinks = [
    {
        title: "company",
        links: ["About", "Jobs", "For the Record"],
    },
    {
        title: "Communities",
        links: ["For Artists", "Developers", "Advertising", "Investors", "Vendors"],
    },
    {
        title: "Useful links",
        links: ["Support", "Free Mobile App", "Popular by Country", "Import your music"],
    },
    {
        title: "Spotify Plans",
        links: ["Premium Individual", "Premium Duo", "Premium Family", "Premium Student", "Spotify Free"],
    },
    {
    socials: [
      <FaInstagramSquare key="ig" size={24} />,
      <BsTwitter key="tw" size={24} />,
      <FaFacebook key="fb" size={24} />,
    ],
    }
]



export default footerLinks