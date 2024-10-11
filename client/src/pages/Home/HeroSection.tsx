import { Button } from 'antd';
import { ArrowRightOutlined, EyeOutlined } from '@ant-design/icons';
import heroImage from "../../images/heroImage.jpg";

const HeroSection = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-24 px-4 sm:px-8 md:mt-36 ">
            <h1 className="text-3xl sm:text-6xl md:text-7xl font-bold leading-tight text-center">
                <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
                    Craft
                </span>{' '}
                <span className="text-orange-600">
                    Compile
                </span>{' '}
                <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                    Conquer
                </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-black font-bold text-center mt-2">
                The Next Generation Code Editor
            </h2>
            <p className="text-gray-700 mt-4 text-center max-w-lg sm:max-w-2xl mx-auto">
                Empower your coding with a next-gen IDE designed for innovation and speed. Collaborate seamlessly, write smarter code, and deploy with confidence all in one powerful platform. CodeSphere is your partner in turning brilliant ideas into extraordinary solutions.
            </p>
            <div className="mt-6 flex space-x-4">
                <Button
                    type="primary"
                    style={{ backgroundColor: 'black', color: 'white' }}   
                >
                    Get Started <ArrowRightOutlined />
                </Button>
                <Button
                    type="primary"
                    style={{ backgroundColor: 'black', color: 'white' }}
                >
                    Read More <EyeOutlined />
                </Button>
            </div>
            <div className="mt-12">
                <img
                    src={heroImage}
                    alt="Next-Generation Code Editor"
                    className="max-w-full h-auto rounded-2xl"
                />
            </div>
        </div>
    );
};

export default HeroSection;
