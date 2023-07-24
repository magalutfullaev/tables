import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../store/slice";
import {RootState} from "../utils/typest";

const Pagination = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const dispatch = useDispatch();
  const {posts, currentPage} = useSelector((state: RootState) => state.slice);
  useEffect(() => {
    setTotalPages(posts.length / 10)
  }, [posts]);

  const renderPaginationButtons = () => {
    const buttons = [];

    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={i === currentPage ? 'active' : ''}
          onClick={() => dispatch(setPage(i))}
        >
          {i}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="pagination">
      <button onClick={() => dispatch(setPage(currentPage - 1))}>Назад</button>
      <div>{renderPaginationButtons()}</div>
      <button onClick={() => dispatch(setPage(currentPage + 2))}>Далее</button>
    </div>
  );
};

export default Pagination;