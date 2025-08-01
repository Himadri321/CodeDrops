import { Calendar, Copy, Eye, PencilLine, Trash2, Share2 } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeDrops } from "../redux/dropSlice";
import toast from "react-hot-toast";
import { FormatDate } from "../utlis/formatDate";

const Drop = () => {
  const drops = useSelector((state) => state.drop.drops);
  console.log(drops);
  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();

  function handleDelete(dropId) {
    dispatch(removeDrops(dropId));
  }

  const filteredData = drops.filter((drop) =>
    drop.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-3">
        {/* Search Bar  */}
        <div className="w-full flex gap-3 px-4 py-2  rounded-[0.3rem] border border-[rgba(128,121,121,0.3)]  mt-6">
          <input
            className="focus:outline-none w-full bg-transparent"
            type="search"
            placeholder="search here"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* All drops */}
        <div className="flex flex-col border border-[rgba(128,121,121,0.3)] py-4 rounded-[0.4rem]">
          <h2 className="px-4 text-4xl font-bold border-b border-[rgba(128,121,121,0.3)] pb-4 text-blue-800">
            All Drops
          </h2>
          <div className="w-full px-4 pt-4 flex flex-col gap-y-5">
            {filteredData.length > 0 ? (
              filteredData.map((drop) => (
                <div
                  key={drop?._id}
                  className="border border-[rgba(128,121,121,0.3)] w-full gap-y-6 justify-between flex flex-col sm:flex-row p-4 rounded-[0.3rem]"
                >
                  {/* heading and Description */}
                  <div className="w-[50%] flex flex-col space-y-3">
                    <p className="text-4xl font-semibold ">{drop?.title}</p>
                    <p className="text-sm font-normal line-clamp-3 max-w-[80%] text-[#707070]">
                      {drop?.content}
                    </p>
                  </div>

                  {/* icons */}
                  <div className="flex flex-col gap-y-4 sm:items-end">
                    <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-blue-500"
                        // onClick={() => toast.error("Not working")}
                      >
                        <a href={`/?dropId=${drop?._id}`}>
                          <PencilLine
                            className="text-black group-hover:text-blue-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                        onClick={() => handleDelete(drop?._id)}
                      >
                        <Trash2
                          className="text-black group-hover:text-pink-500"
                          size={20}
                        />
                      </button>

                      <button className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-orange-500">
                        <a href={`/drop/${drop?._id}`} target="_blank">
                          <Eye
                            className="text-black group-hover:text-orange-500"
                            size={20}
                          />
                        </a>
                      </button>
                      <button
                        className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-green-500"
                        onClick={() => {
                          navigator.clipboard.writeText(drop?.content);
                          toast.success("Copied to Clipboard");
                        }}
                      >
                        <Copy
                          className="text-black group-hover:text-green-500"
                          size={20}
                        />
                      </button>
                      {drop?._id && (
                        <button
                          className="p-2 rounded-[0.2rem] bg-white border border-[#c7c7c7]  hover:bg-transparent group hover:border-pink-500"
                          onClick={() => {
                            const shareUrl = `${window.location.origin}/?dropId=${drop?._id}`;
                            navigator.clipboard.writeText(shareUrl);
                            toast.success("Link copied to clipboard!", {
                              position: "top-right",
                            });

                            // Optional: Use Web Share API
                            if (navigator.share) {
                              navigator
                                .share({
                                  title: "CodeDrops Share",
                                  text: "Check out this drop!",
                                  url: shareUrl,
                                })
                                .catch((err) =>
                                  console.error("Share failed", err)
                                );
                            }
                          }}
                        >
                          <Share2 size={20} />
                        </button>
                      )}
                    </div>

                    <div className="gap-x-2 flex ">
                      <Calendar className="text-black" size={20} />
                      {FormatDate(drop?.createdAt)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-2xl text-center w-full text-chileanFire-500">
                No Data Found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drop;
