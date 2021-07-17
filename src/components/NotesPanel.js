import React, { Component } from "react";
import { observer } from "mobx-react";

import { EditorState, ContentState, RichUtils, convertFromHTML } from 'draft-js';

import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import PluginEditor from "draft-js-plugins-editor";
import {stateToHTML} from 'draft-js-export-html';

import '../sass/main.scss'
import 'draft-js/dist/Draft.css';

import store from "../store";

const plugins = [createMarkdownShortcutsPlugin()];

@observer
class NotesPanel extends Component {
  constructor(props) {
    super(props);

    //Temporary Notes data
    const blocksFromHTML = convertFromHTML (
      '<h4>Notes</h4>' + 
      '<p>This editor supports common text markdown such as <b>bold</b>, <i>italics</i>, ect.</p>' + 
      '<ul>' + 
        '<li>Note A</li>' + 
        '<li>Note B</li>' +  
          '<ul>' + 
            '<li>Sub 1</li>' + 
            '<li>Sub 2</li>' + 
          '</ul>' + 
      '</ul>'
    );
    
    //Convert Tepm to EditorState
    const state = ContentState.createFromBlockArray (
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    this.state = {editorState: EditorState.createWithContent(state)};
  }

  onChange = (editorState) => {
    //TODO: This is really slow but functional
    store.notes = this.getContent();
    this.setState({editorState});
  }

  getContent = () => { 
    return stateToHTML(this.state.editorState.getCurrentContent());
  }

  setContent = (html) => {
    //Convert html to EditorState
    const blocksFromHTML = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap,
    );

    this.setState({editorState: EditorState.createWithContent(state)});
  }

	handleKeyCommand = (command, oldState)  => {
		const newState = RichUtils.handleKeyCommand(oldState, command);
		
    //Process Command inputs
    if (newState) {
			setEditorState(newState);
			return "handled";
		}
		return "not-handled";
	};
  
  render() {
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