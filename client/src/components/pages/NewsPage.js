import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {loadList, updateNews} from "../../redux/newsActions";
import {Pagination} from "../pagination/Pagination";
import {News} from "../News";
import {Player} from "../Player";
import {NewsEditor} from "../editor/NewsEditor";

export const NewsPage = () => {
  const {news, limit, total, currentPage} = useSelector(({newsList}) => {
    return {
      news: newsList.items,
      limit: newsList.limit,
      total: newsList.total,
      currentPage: newsList.currentPage
    }
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadList())
  }, [loadList])

  return (
    <div>
      <h1>News</h1>

      <Player/>

      <Pagination limit={limit} total={total} currentPage={currentPage} loader={() => loadList}/>

      {news && news.map(item => <News key={item._id} item={item}/>)}

      <Pagination limit={limit} total={total} currentPage={currentPage} loader={() => loadList}/>

      <div id="modal1" className="modal">
        <div className="modal-footer">
          <button className="btn-floating btn-small waves-effect waves-light right blue-grey modal-close">
            <i className="material-icons">close</i>
          </button>
        </div>
        <div className="modal-content">
          <NewsEditor saveText={data => dispatch(updateNews(data))}/>
        </div>
      </div>
    </div>
  )
}
