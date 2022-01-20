import React, { useState, useEffect } from "react"
import { Pagination } from "react-bootstrap"

const HistoryPagination = ({ current, total, setPage }) => {
  const [pageArray, setPageArray] = useState([])

  useEffect(() => {
    var totPages = parseInt(total - 1);
    var currentPage = parseInt(current);
    var pageArr = [];
    if (totPages > 1) {
      if (totPages <= 9) {
        var i = 1;
        while (i <= totPages) {
          pageArr.push(i);
          i++;
        }
      } else {
        if (currentPage <= 5) pageArr = [1, 2, 3, 4, 5, 6, 7, 8, "", totPages];
        else if (totPages - currentPage <= 4)
          pageArr = [
            1,
            "",
            totPages - 7,
            totPages - 6,
            totPages - 5,
            totPages - 4,
            totPages - 3,
            totPages - 2,
            totPages - 1,
            totPages
          ];
        else
          pageArr = [
            1,
            "",
            currentPage - 3,
            currentPage - 2,
            currentPage - 1,
            currentPage,
            currentPage + 1,
            currentPage + 2,
            currentPage + 3,
            "",
            totPages
          ];
      }
    }
    setPageArray(pageArr);
  }, [current, total])

  return (
    <Pagination style={{ justifyContent: 'center' }}>
      {pageArray.map((ele, ind) => {
        const toReturn = [];

        if (ind === 0) {
          toReturn.push(
            <Pagination.First
              key={"firstpage"}
              onClick={
                current === 1
                  ? () => { }
                  : () => {
                    setPage(1);
                  }
              }
            />
          );

          toReturn.push(
            <Pagination.Prev
              key={"prevpage"}
              onClick={
                current === 1
                  ? () => { }
                  : () => {
                    setPage(current - 1);
                  }
              }
            />
          );
        }

        if (ele === "") toReturn.push(<Pagination.Ellipsis key={ind} />);
        else
          toReturn.push(
            <Pagination.Item
              key={ind}
              active={current === ele ? true : false}
              onClick={
                current === ele
                  ? () => { }
                  : () => {
                    setPage(ele);
                  }
              }
            >
              {ele}
            </Pagination.Item>
          );

        if (ind === pageArray.length - 1) {
          toReturn.push(
            <Pagination.Next
              key={"nextpage"}
              onClick={
                current === ele
                  ? () => { }
                  : () => {
                    setPage(current + 1);
                  }
              }
            />
          );

          toReturn.push(
            <Pagination.Last
              key={"lastpage"}
              onClick={
                current === ele
                  ? () => { }
                  : () => {
                    setPage(ele);
                  }
              }
            />
          );
        }

        return toReturn;
      })}
    </Pagination>
  )
}

export default HistoryPagination