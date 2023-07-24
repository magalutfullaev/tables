import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../store/slice";
import {RootState} from "../utils/typest";

const Pagination = () => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const dispatch = useDispatch();
  const {posts, currentPage, error, loading} = useSelector((state: RootState) => state.slice);
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

  if (!posts.length || error || loading){
    return (
      <div></div>
    )
  }

  return (
    <div className="pagination">
      <button onClick={() => dispatch(setPage(currentPage - 1))}><p>Назад</p>
        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="12" viewBox="0 0 8 12" fill="none">
          <line x1="7.09525" y1="0.438392" x2="1.26869" y2="6.26495" stroke="#474955"/>
          <line x1="1.43839" y1="5.73129" x2="7.09525" y2="11.3881" stroke="#474955"/>
        </svg>
      </button>
      <div>{renderPaginationButtons()}</div>
      <button onClick={() => dispatch(setPage(currentPage + 2))}><p>Далее</p><svg xmlns="http://www.w3.org/2000/svg" width="7" height="12" viewBox="0 0 7 12" fill="none">
        <line x1="0.561608" y1="11.3882" x2="6.38817" y2="5.56162" stroke="#474955"/>
        <line x1="6.21847" y1="6.09528" x2="0.561614" y2="0.438429" stroke="#474955"/>
      </svg></button>
    </div>
  );
};

export default Pagination;