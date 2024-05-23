import { useState } from "react";
import "./App.css";
import { useMedsAPI } from "./API/useMedsAPI";
import SearchBar from "./components/SearchBar";
import { Container } from "./components/Container";
import { SaltCard } from "./components/SaltCard";
import { Loader } from "./components/Loader";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [notFound, setNotFound] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch =  () => {
    if (!searchQuery.trim()) {
      setError("please enter something");
      return;
    }

    setSearchResults([]);
    setIsLoading(true);
    setError(null);
    setNotFound("");

    useMedsAPI(searchQuery)
      .then((res) => {
        if (res.data?.saltSuggestions.length > 0) {
          setSearchResults(res.data?.saltSuggestions);
        } else {
          setNotFound(searchQuery);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setError("An error occurred while fetching search results");
      })
      .finally(() => setIsLoading(false));
  };

  const handleBackBtn = () => {
    setIsLoading(true);
    setSearchResults([]);
    setError(null);
    setNotFound("");
    setSearchQuery("");
    setIsLoading(false);
  };

  // if (isLoading) return <div className="h-[100dvh] flex items-center justify-center"><Loader/></div>
  return (
    <>
      <h1 className="text-2xl text-black mt-8 mb-8 max-md:px-3">
        Cappsule web development test
      </h1>
      <div className="full-bg sticky top-0 bg-white pt-8">
        <Container className="max-md:px-3">
          <SearchBar
            disabled={isLoading}
            onSearch={handleSearch}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            value={searchQuery}
            isResult={searchResults.length > 0 || notFound}
            resetSearchCallBack={handleBackBtn}
          />
          <div className="mt-11 relative">
            {notFound && (
              <span className="text-left absolute left-0 bottom-0">
                No salt found for "<b>{notFound}</b>"
              </span>
            )}
            {error && (
              <span className="text-left absolute left-0 bottom-0">
                {error}
              </span>
            )}
            <hr className="h-[1px] bg-[#CDCDCD]" />
          </div>
        </Container>
      </div>
      <Container className="max-md:px-3">
        {isLoading ? (
          <div className=" pt-20 flex justify-center">
            <Loader />
          </div>
        ) : (
          <div className="result-container space-y-11 mt-9">
            {searchResults.length > 0 ? (
              searchResults.map((medsInfo) => (
                <SaltCard key={medsInfo.id} medsInfo={medsInfo} />
              ))
            ) : (
              <div className="text-[#888888] text-[20px] font-semibold my-auto h-[30vh] flex items-center justify-center">
                “ Find medicines with amazing discount “
              </div>
            )}
          </div>
        )}
      </Container>
    </>
  );
}

export default App;
