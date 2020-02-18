import React, { Component, Fragment } from "react";
import { Editor } from "slate-react";
import { Value } from "slate";

import Icon from "react-icons-kit";
import { bold } from "react-icons-kit/feather/bold";
import { italic } from "react-icons-kit/feather/italic";
import { code } from "react-icons-kit/feather/code";
import { list } from "react-icons-kit/feather/list";
import { underline } from "react-icons-kit/feather/underline";

import { BoldMark, ItalicMark, FormatToolbar } from "./index";
const initialValue = Value.fromJSON({
  document: {
    nodes: [
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "Hello this is a Simple text editor. You can use your keyboard to edit it too. Crtl B to bold, Crtl U to underline"
              }
            ]
          }
        ]
      }
    ]
  }
});

export default class TextEditor extends Component {
  state = {
    value: initialValue
  };

  onKeyDown = (e, change) => {

    if (!e.ctrlKey) {
      return;
    }
    e.preventDefault();

    switch (e.key) {
      case "b": {
        change.toggleMark("bold");
        return true;
      }
      case "i": {
        change.toggleMark("italic");
        return true;
      }
      case "l": {
        change.toggleMark("list");
        return true;
      }

      case "c": {
        change.toggleMark("code");
        return true;
      }

      case "u": {
        change.toggleMark("underline");
        return true;
      }

      default: {
        return;
      }
    }
  };

  renderMark = props => {
    switch (props.mark.type) {
      case "bold":
        return <BoldMark {...props} />;

      case "italic":
        return <ItalicMark {...props} />;

      case "code":
        return <code {...props.attributes}>{props.children}</code>;

      case "list":
        return (
          <ul {...props.attributes}>
            <li>{props.children}</li>
          </ul>
        );
      case "underline":
        return <u {...props.attributes}>{props.children}</u>;

      default:
        return;
    }
  };

  onChange = ({ value }) => {
    this.setState({ value });
  };

  onMarkClick = (e, type) => {
    e.preventDefault();
    const { value } = this.state;
    const change = value.change().toggleMark(type);
    this.onChange(change);
  };

  render() {
    return (
      <Fragment>
        <FormatToolbar>
          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, "bold")}
          >
            <Icon icon={bold} />
          </button>

          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, "italic")}
          >
            <Icon icon={italic} />
          </button>

          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, "code")}
          >
            <Icon icon={code} />
          </button>

          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, "list")}
          >
            <Icon icon={list} />
          </button>

          <button
            className="tooltip-icon-button"
            onPointerDown={e => this.onMarkClick(e, "underline")}
          >
            <Icon icon={underline} />
          </button>
        </FormatToolbar>
        <Editor
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderMark={this.renderMark}
        />
      </Fragment>
    );
  }
}
