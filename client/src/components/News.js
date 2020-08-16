import React from "react"
import {useDispatch, useSelector} from "react-redux";
import {approveNews, deleteNews, vocalizeNews} from "../redux/newsActions";
import {playToggle} from "../redux/player/playerActions";
import classnames from "classnames";
import {useModal} from "../hoooks/modal.hook"
import {loadContentNews} from "../redux/editor/newsEditorActions";

export const News = ({item}) => {
  const {playing, url} = useSelector(({player}) => {
    return {
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

  const modalHook = useModal()

  const editHandler = (news) => {
    dispatch(loadContentNews(news))
    modalHook('modal1', modal => {
      modal.open()
    })
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

  const renderApproveBtn = item => {
    return (
      <button className={classnames(
        'btn-floating btn-small waves-effect waves-light btn-floating',
        {grey: !item.approved},
        {green: item.approved}
      )}
              onClick={() => approveHandler(item._id)}
      >
        <i className="material-icons">thumb_up</i>
      </button>
    )
  }

  const renderDeleteBtn = item => {
    return (
      <button className="btn-floating btn-small waves-effect waves-light red"
              onClick={() => removeNewsHandler(item._id)}
      >
        <i className="material-icons">delete</i>
      </button>
    )
  }

  const renderEditBtn = item => {
    if (item.approved) {
      return (
        <button className="btn-floating btn-small waves-effect waves-light grey"
                data-target="modal1"
                onClick={() => editHandler(item)}
        >
          <i className="material-icons">edit</i>
        </button>
      )
    }
  }

  const printDate = date => new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  }).format(new Date(date))

  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <div className="card-content">
            <span className="card-title">{item.title}</span>
            <p>{item.text}</p>
            <span className="right grey-text">{printDate(item.createdAt)}</span>
          </div>
          <div className="card-action">
            {renderApproveBtn(item)}
            {renderVoiceoverBtn(item)}
            {renderEditBtn(item)}
            {renderPlayBtn(item)}
            {renderDeleteBtn(item)}
          </div>
        </div>
      </div>
    </div>
  )
}
