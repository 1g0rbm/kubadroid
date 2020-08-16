import React from "react";
import {Editor, convertToRaw, RichUtils} from 'draft-js';
import {useDispatch, useSelector} from "react-redux";
import {EDITOR_NEWS} from "../../redux/types";

export const NewsEditor = ({saveText}) => {
  const {newsEditor} = useSelector(({newsEditor}) => {
    return {
      newsEditor: newsEditor
    }
  })

  const dispatch = useDispatch()

  const handleEditorChange = (editorState) => {
    dispatch({type: EDITOR_NEWS, payload: editorState})
  }

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(newsEditor, command)
    if (newState) {
      handleEditorChange(newState)
      return 'handled';
    }

    return 'not-handled';
  }

  const saveHandler = () => {
    saveText({
      text: convertToRaw(newsEditor.getCurrentContent())
        .blocks
        .reduce((acc, item) => `${acc} ${item.text}`, ``)
    })
  }

  return (
    <div>
      <div className="editor-text-area">
        <Editor
          editorState={newsEditor}
          handleKeyCommand={handleKeyCommand}
          onChange={handleEditorChange}
        />
      </div>
      <div className="editor-actions">
        <button className="btn-floating btn-small waves-effect waves-light grey" onClick={saveHandler}>
          <i className="material-icons">save</i>
        </button>
      </div>
    </div>
  )
}
