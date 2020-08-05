import React from "react"
import ReactPlayer from "react-player";
import {useDispatch, useSelector} from "react-redux";
import {playToggle} from "../redux/player/playerActions";

export const Player = () => {
  const {playing, url} = useSelector(({player}) => {
    return {
      playing: player.playing,
      url: player.url,
    }
  })

  const dispatch = useDispatch()

  const onEndedHandler = () => {
    dispatch(playToggle(false, null))
  }

  return (
    <div className='player-wrapper'>
      <ReactPlayer
        className='react-player'
        url={url}
        playing={playing}
        width='100%'
        height='100%'
        onError={e => console.log('onError', e)}
        onEnded={() => onEndedHandler()}
      />
    </div>
  )
}
