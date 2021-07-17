import React, { Component } from "react";
import { observer } from "mobx-react";

import { EditorState, ContentState, RichUtils, convertFromHTML, convertToRaw } from 'draft-js';

import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import PluginEditor from "draft-js-plugins-editor";
import draftToHtml from 'draftjs-to-html';

import '../sass/main.scss'
import 'draft-js/dist/Draft.css';

import store from "../store";

const plugins = [createMarkdownShortcutsPlugin()];

@observer
class NotesPanel extends Component {
  constructor(props) {
    super(props); 

    //Retrieve Notes data
    const blocksFromHTML = convertFromHTML(window.localStorage.getItem('Notes'));

    //Convert Tepm to EditorState
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap, 
    );

    this.state = { editorState: EditorState.createWithContent(state) };
  }

  onChange = (editorState) => {
    this.setState({ editorState: editorState });
  } 

  getContent = () => {
    const rawContentState = convertToRaw(this.state.editorState.getCurrentContent());
    return draftToHtml( rawContentState );
  }

  handleKeyCommand = (command, oldState) => {
    const newState = RichUtils.handleKeyCommand(oldState, command);

    //Process Command inputs
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  render() {
    //TODO: This is really slow but functional
    //Save Notes Information
    window.localStorage.setItem('Notes', this.getContent());

    return (
      <div className="NotesPanel">
        <h4>Notes</h4>

        {/* Notes Editor Element */}
        <div className="NotesContainer">
          <PluginEditor
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            editorState={this.state.editorState}
            plugins={plugins}
          />
        </div>

      </div>
    );
  }

}

export default NotesPanel;