import React, {useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {loadList} from "../../redux/newsActions";
import {Pagination} from "../pagination/Pagination";
import {News} from "../News";
import {Player} from "../Player";

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

      <Player/>

      <Pagination limit={limit} total={total} currentPage={currentPage} loader={() => loadList}/>

      {news.map(item => <News key={item._id} item={item}/>)}

      <Pagination limit={limit} total={total} currentPage={currentPage} loader={() => loadList}
      />
    </div>
  )
}
