import { useState, useEffect } from "react";

const Notice = () => {
  const [noticeData, setNoticeData] = useState([]);
  const [search, setSearch] = useState("");
  const uri = import.meta.env.VITE_GET_NOTICE_URI;

  const getNotice = async ()=>{
    try {
      const response = await fetch(uri,{
        method:"GET",
      });
      if(response.ok){
        const data = await response.json();
        setNoticeData(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(()=>{
    getNotice()
  },[]);
  const filteredNotices = noticeData.filter((notice) =>
    notice.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="min-h-screen bg-gray-100 py-20 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center">
          📢 Notices
        </h1>

        <p className="text-gray-600 text-center mt-3">
          Stay updated with the latest announcements.
        </p>

        {/* Search */}

        <div className="flex justify-center mt-8">

          <input
            type="text"
            placeholder="Search Notice..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              sm:w-[450px]
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
          />

        </div>

        {/* Notice Cards */}

        <div className="mt-10 space-y-6">

          {filteredNotices.map((notice) => (

            <div
              key={notice._id}
              className="
                bg-white
                rounded-2xl
                shadow-lg
                p-6
                hover:shadow-2xl
                transition
              "
            >

              <h2 className="text-2xl font-bold text-blue-600">
                📢 {notice.title}
              </h2>

              <p className="text-gray-600 mt-4">
                {notice.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:justify-between mt-5 text-gray-500 text-sm gap-2">

                <span>
                  <strong>Author:</strong> {notice.author}
                </span>

                <span>
                  <strong>Published:</strong> {new Date(notice.publishedDate).toLocaleDateString()}
                </span>

              </div>

              {/* <button
                className="
                  mt-6
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5
                  py-2
                  rounded-lg
                  transition
                "
              >
                View Notice
              </button> */}

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Notice;