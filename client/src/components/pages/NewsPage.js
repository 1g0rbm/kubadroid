import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {loadList} from "../../redux/newsActions";
import {Pagination} from "../pagination/Pagination";

export const NewsPage = () => {
  const {news, limit, total, currentPage} = useSelector(({newsList}) => {
    return {
      news: newsList.items,
      limit: newsList.limit,
      total: newsList.total,
      currentPage: newsList.currentPage,
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadList())
  }, [loadList])

  return (
    <div>
      <h1>News</h1>
      <Pagination
        limit={limit}
        total={total}
        currentPage={currentPage}
        loader={() => loadList}
      />
      {
        news.map(item => {
          return (
            <div className="row" key={item._id}>
              <div className="col">
                <div className="card">
                  <div className="card-content">
                    <span className="card-title">{item.title}</span>
                    <p>{item.text}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
      <Pagination
        limit={limit}
        total={total}
        currentPage={currentPage}
        loader={() => loadList}
      />
    </div>
  )
}