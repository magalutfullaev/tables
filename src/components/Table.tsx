import React, {useState} from "react";
import {useSelector} from "react-redux";
import {PostT, RootState} from "../utils/typest";

const svgAsc = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
  <line x1="0.353553" y1="0.646447" x2="6.18011" y2="6.47301" stroke="#FCFCFC"/>
  <line x1="5.64645" y1="6.30331" x2="11.3033" y2="0.646453" stroke="white"/>
</svg>;

const svgDesc = <svg xmlns="http://www.w3.org/2000/svg" width="12" height="7" viewBox="0 0 12 7" fill="none">
  <line x1="11.3033" y1="6.18012" x2="5.47675" y2="0.353563" stroke="#FCFCFC"/>
  <line x1="6.01041" y1="0.523262" x2="0.35356" y2="6.18012" stroke="white"/>
</svg>

const Table = () => {
  const {posts, currentPage, search} = useSelector((state: RootState) => state.slice);
  const [sort, setSort] = useState<{ title: 'title' | 'body' | 'id', direction: boolean }>({
    title: 'title',
    direction: false
  });

  const sortedPosts = (): PostT[] => {
    let sortedArray = []
    if (sort.title === 'id') {
      sortedArray = posts.slice().sort((a, b) => {
        if (sort.direction) {
          return b.id - a.id
        } else {
          return a.id - b.id
        }
      });
    } else {
      sortedArray = posts.slice().sort((a, b) => {
          if (sort.direction) {
            return (b[sort.title] + '').localeCompare(a[sort.title] + '')
          } else {
            return (a[sort.title] + '').localeCompare(b[sort.title] + '')
          }
        }
      );
    }

    return sortedArray;
  };

  const filteredPosts = sortedPosts().filter(post => post.title.includes(search));

  const thisPage = filteredPosts.slice((currentPage * 10) - 10, currentPage * 10);

  return (
    <div className="table">
      <div className="head">
        <button onClick={() => {
          setSort(oldSort => {
            if (oldSort.title === 'id') {
              return {title: 'id', direction: !oldSort.direction}
            } else {
              return {title: 'id', direction: true}
            }})
        }}>ID{sort.title === 'id' ? sort.direction ? svgDesc : svgAsc : svgAsc}</button>
      </div>
      <div className="head">
        <button onClick={() => {
          setSort(oldSort => {
            if (oldSort.title === 'title') {
              return {title: 'title', direction: !oldSort.direction}
            } else {
              return {title: 'title', direction: true}
            }})
        }}>Загаловок{sort.title === 'title' ? sort.direction ? svgDesc : svgAsc : svgAsc}</button>
      </div>
      <div className="head">
        <button onClick={() => {
          setSort(oldSort => {
            if (oldSort.title === 'body') {
              return {title: 'body', direction: !oldSort.direction}
            } else {
              return {title: 'body', direction: true}
            }})
        }}>Описание{sort.title === 'body' ? sort.direction ? svgDesc : svgAsc : svgAsc}</button>
      </div>
      {thisPage.map(post =>
        <React.Fragment key={post.id}>
          <div className="body id">{post.id}</div>
          <div className="body">{post.title}</div>
          <div className="body">{post.body}</div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Table;