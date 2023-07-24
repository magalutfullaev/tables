import React, {useEffect, useState} from "react";
import Search from "./components/Search";
import Table from "./components/Table";
import Pagination from "./components/Pagination";

import "./app.scss";
import {fetchPosts} from "./store/slice";
import {useAppDispatch} from "./utils/typest";

const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchPosts())
  }, []);

  return (
    <div className="app">
      <Search />
      <Table />
      <Pagination />
    </div>
  );
};

export default App;
