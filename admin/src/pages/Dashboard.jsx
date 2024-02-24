import { IoBagRemoveSharp } from "react-icons/io5";
import { VscGraph } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { name: "1 Jan", uv: 30000, pv: 2400, amt: 2400 },
  { name: "2 Jan", uv: 2000, pv: 2400, amt: 2400 },
  { name: "3 Jan", uv: 10000, pv: 2400, amt: 2400 },
  { name: "4 Jan", uv: 3000, pv: 2400, amt: 2400 },
  { name: "5 Jan", uv: 10000, pv: 2400, amt: 2400 },
  { name: "6 Jan", uv: 4000, pv: 2400, amt: 2400 },
];

const Home = () => {
  const active = true;

  return (
    <section>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full ">
          <div className="flex items-center gap-10">
            <div className="bg-white py-5 px-4 rounded">
              <Link className="flex gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center bg-green-500/10 `}
                >
                  <IoBagRemoveSharp
                    className={`text-xl  text-green-500
                }`}
                  />
                </div>
                <div>
                  <h1
                    className={`text-sm md:text-lg font-medium 
              }`}
                  >
                    Total Posts
                  </h1>
                  <h1 className="text-xl sm:text-xl md:text-4xl">28</h1>
                </div>
              </Link>
            </div>
            <div className="bg-white py-5 px-4 rounded">
              <Link className="flex gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center bg-[#14AAFF]/10 `}
                >
                  <VscGraph
                    className={`text-xl  text-[#14AAFF]
                }`}
                  />
                </div>
                <div>
                  <h1
                    className={`text-sm md:text-lg font-medium 
              }`}
                  >
                    Total Views
                  </h1>
                  <h1 className="text-xl md:text-4xl">50</h1>
                </div>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded mt-5 px-4 py-4">
            <div className="flex items-center ">
              <div className="flex items-center gap-5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center bg-[#14AAFF]/10 `}
                >
                  <VscGraph
                    className={`text-xl  text-[#14AAFF]
                }`}
                  />
                </div>
                <h1>Views</h1>
              </div>
            </div>
            <div className="w-full flex items-center py-4">
              <LineChart width={450} height={210} data={data}>
                <Line
                  type="monotone"
                  dataKey="uv"
                  strokeWidth="2"
                  stroke="#FF6900"
                />
                <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
              </LineChart>
            </div>
          </div>
        </div>
        <div>helo</div>
      </div>
    </section>
  );
};

export default Home;
