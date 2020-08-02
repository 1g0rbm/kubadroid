import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import classnames from 'classnames';
import {loadList, deleteNews, approveNews} from "../../redux/newsActions";
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

  const removeNewsHandler = newsId => {
    dispatch(deleteNews(newsId))
  }

  const approveHandler = newsId => {
    dispatch(approveNews(newsId))
  }

  const printDate = date => new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(new Date(date))

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
                    <span className="right grey-text">{printDate(item.createdAt)}</span>
                  </div>
                  <div className="card-action">
                    <button className={classnames(
                      'btn-floating btn-small waves-effect waves-light btn-floating',
                      {grey: !item.approved},
                      {green: item.approved}
                    )}
                            onClick={() => approveHandler(item._id)}
                    >
                      <i className="material-icons">thumb_up</i>
                    </button>
                    <button className="btn-floating btn-small waves-effect waves-light red"
                            onClick={() => removeNewsHandler(item._id)}
                    >
                      <i className="material-icons">delete</i>
                    </button>
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