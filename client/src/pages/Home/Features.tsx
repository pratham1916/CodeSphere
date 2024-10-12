import { Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { features } from '../../constants/constants';

const Features = () => {
    return (
        <div className='mt-20 mb-20'>
            <div className="flex justify-between ">
                <div className="flex-1 pr-8">
                    <h2 className="text-4xl font-semibold">Unlock Your Coding Potential with CodeSphere</h2>
                </div>
                <div className="flex-1 pl-4">
                    <p className="text-gray-700 text-lg">
                        Discover an all-in-one coding platform that enhances your skills and challenges your abilities.
                        CodeSphere empowers beginners and experienced developers alike to learn, practice, and grow in a
                        supportive environment.
                    </p>
                    <Button className="mt-4 bg-black hover:bg-gray-800 text-white font-semibold" icon={<RocketOutlined />}>
                        Launch IDE
                    </Button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="p-6 border rounded-lg cursor-pointer border-black"
                        style={{ transition: 'background-color 0.3s', backgroundColor: 'transparent' }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = feature.hoverBgColor}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <h3 className="text-lg font-semibold mb-3">{feature.title}</h3>
                        <span className="text-5xl text-gray-800">{feature.percentage}</span>
                        <p className="text-gray-950 mb-2 mt-4">{feature.reason}</p>
                        <hr className="border-gray-900 my-4" />
                        <p className="text-gray-950">{feature.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Features;
