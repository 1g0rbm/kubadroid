import React, {useEffect} from "react"
import classnames from 'classnames';
import {useDispatch, useSelector} from "react-redux"
import ReactPlayer from 'react-player'
import {loadList, deleteNews, approveNews, vocalizeNews} from "../../redux/newsActions";
import {Pagination} from "../pagination/Pagination";
import {playToggle} from "../../redux/player/playerActions";

export const NewsPage = () => {
  const {news, limit, total, currentPage, playing, url} = useSelector(({newsList, player}) => {
    return {
      news: newsList.items,
      limit: newsList.limit,
      total: newsList.total,
      currentPage: newsList.currentPage,
      playing: player.playing,
      url: player.url,
    }
  })

  const dispatch = useDispatch()

  const removeNewsHandler = newsId => {
    dispatch(deleteNews(newsId))
  }

  const approveHandler = newsId => {
    dispatch(approveNews(newsId))
  }

  const vocalizeHandler = newsId => {
    dispatch(vocalizeNews(newsId))
  }

  const playHandler = _url => {
    dispatch(playToggle(url === _url ? !playing : true, _url))
  }

  const renderVoiceoverBtn = item => {
    if (item.filepath === null && item.approved) {
      return (
        <button className="btn-floating btn-small waves-effect waves-light grey"
                onClick={() => vocalizeHandler(item._id)}
        >
          <i className="material-icons">keyboard_voice</i>
        </button>
      )
    }

    return null
  }

  const renderPlayBtn = item => {
    if (item.filepath === null) {
      return null
    }

    if (playing && item.filepath === url) {
      return (
        <button className="btn-floating btn-small waves-effect waves-light grey"
                onClick={() => playHandler(item.filepath)}
        >
          <i className="material-icons">play_circle_filled</i>
        </button>
      )
    }

    if (!playing && item.filepath === url) {
      return (
        <button className="btn-floating btn-small waves-effect waves-light grey"
                onClick={() => playHandler(item.filepath)}
        >
          <i className="material-icons">pause_circle_filled</i>
        </button>
      )
    }

    return (
      <button className="btn-floating btn-small waves-effect waves-light grey"
              onClick={() => playHandler(item.filepath)}
      >
        <i className="material-icons">play_circle_outline</i>
      </button>
    )
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
      <div className='player-wrapper'>
        <ReactPlayer
          className='react-player'
          url={url}
          playing={playing}
          width='100%'
          height='100%'
          onError={e => console.log('onError', e)}
        />
      </div>
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
                    {renderVoiceoverBtn(item)}
                    {renderPlayBtn(item)}
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