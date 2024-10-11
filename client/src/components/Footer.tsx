
import { Image } from "antd";
import { footerLinks } from "../constants/constants";
import logo from "../images/Logo.png";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="bg-gray-50 w-full">
            <div
                id="footer"
                className=" w-full main-container hidden md:block h-auto pt-12 pb-8 px-10"
            >
                <div className="flex items-start justify-between w-full px-2">
                    {footerLinks.map((item, index) => (
                        <div
                            key={index}
                            className="w-[15%] flex flex-col mr-4 items-start justify-start"
                        >
                            <p className="text-lg/tight pb-2 font-medium text-gray-800">
                                {item.title}
                            </p>
                            <ul className="flex flex-col *:pb-2 *:mt-2 *:text-base *:font-light/loose ">
                                {item.subtitle.map((subtitle, subIndex) => (
                                    <li
                                        key={subIndex}
                                        className="*:text-gray-700 *:hover:text-blue-800"
                                    >
                                        <Link to={item.links[subIndex]} className="">
                                            {subtitle}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="w-[25%] flex flex-col items-start justify-start gap-5">
                        <Link to="/">
                            <Image
                                src={logo}
                                width={200}
                                height={60}
                                alt="footer logo"
                            />
                        </Link>
                        <p className="text-base font-medium text-gray-600 max-w-[35ch]">
                            CodeSphere is your go-to platform for practicing coding problems, enhancing your skills, and preparing for technical interviews. Our intuitive interface and comprehensive problem sets are designed to challenge and grow developers of all levels.
                        </p>
                        <div className="hidden flex-col gap-2">
                            <Link to="'/"
                                className="text-gray-700 text-base font-medium hover:text-blue-800"
                            >
                                About
                            </Link>
                            <Link to="'/"
                                className="text-gray-700 text-base font-medium hover:text-blue-800"
                            >
                                Contact us
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
