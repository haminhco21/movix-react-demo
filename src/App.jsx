import { useEffect } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { fetchDataFromAPI } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, selectApi, getGenres } from "./store/homeSlice";
import Home from "./pages/home/Home";
import PageNotFound from "./pages/404/PageNotFound";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/searchResult/SearchResult";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const dispatch = useDispatch();
  const url = useSelector(selectApi);
  console.log(url);
  useEffect(() => {
    fetchApiConfig();
    genrosCall();
  }, []);

  const fetchApiConfig = () => {
    fetchDataFromAPI("configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      };

      dispatch(getApiConfiguration(url));
    });
  };

  const genrosCall = async () => {
    let promises = [];
    let endPoint = ["tv", "movie"];
    let allGenres = {};

    endPoint.forEach((url) => {
      promises.push(fetchDataFromAPI(`/genre/${url}/list`));
    });

    const data = await Promise.all(promises);
    data.map(({ genres }) => {
      return genres.map((item) => (allGenres[item.id] = item));
    });
    dispatch(getGenres(allGenres));
  };

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
