import { useEffect, useState } from "react";
import { Copy, PlusCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { updateDrops, addDrops } from "../redux/dropSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dropId = searchParams.get("dropId");
  const dispatch = useDispatch();
  const allDrops = useSelector((state) => state.drop.drops);

  const createDrop = () => {
    const drop = {
      title: title,
      content: value,
      _id:
        dropId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2),
      createdAt: new Date().toISOString(),
    };

    if (dropId) {
      dispatch(updateDrops(drop));
    } else {
      dispatch(addDrops(drop));
    }

    setTitle("");
    setValue("");

    setSearchParams({});
  };

  const resetDrops = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  useEffect(() => {
    if (dropId) {
      const drop = allDrops.find((p) => p._id === dropId);
      if (drop) {
        setTitle(drop.title);
        setValue(drop.content);
      }
    }
  }, [dropId]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="flex flex-col md:flex-row gap-4 items-start justify-between w-full">
          <input
            className={`${
              dropId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2`}
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            onClick={createDrop}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {dropId ? "Update drop" : "Create your drop"}
          </button>
          {dropId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetDrops}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div
                className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}
              />

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>
            {/* Circle and copy btn */}
            <div
              className={`w-fit rounded-t flex items-center justify-between gap-x-4 px-4`}
            >
              {/*Copy  button */}
              <button
                className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
                onClick={() => {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard", {
                    position: "top-right",
                  });
                }}
              >
                <Copy className="group-hover:text-sucess-500" size={20} />
              </button>
            </div>
          </div>
          <textarea
            className="w-full border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={value}
            placeholder="Write your content here..."
            onChange={(e) => setValue(e.target.value)}
            rows={18}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
