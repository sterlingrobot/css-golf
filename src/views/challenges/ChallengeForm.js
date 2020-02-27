import React from 'react';
import PropTypes from 'prop-types';

import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-scss';

import { TextInput } from '../../styles/forms';
import editor from '../../styles/editor';

import 'prismjs/themes/prism.css';
import '../../styles/form.scss';
import '../../styles/editor.scss';

class ChallengeForm extends React.Component {
  state = {
    html: this.props.challenge ? this.props.challenge.html || '' : '',
    css: this.props.challenge ? this.props.challenge.css || '' : ''
  };

  onSubmit = event => {
    event.preventDefault();
    const { path, title, html, css } = event.target.elements;
    const values = {
      path: path.value,
      title: title.value,
      html: html.value,
      css: css.value
    };
    return this.props.onSubmit(values);
  };

  render() {
    const {
      props: { challenge, error, onClick, onDelete }
    } = this;
    return (
      <form id="challengeForm" onSubmit={this.onSubmit}>
        <input type="hidden" name="path" defaultValue={challenge.path} />
        <div className="form-wrap">
          <div className="form-row">
            <div className="form-control">
              <TextInput
                type="text"
                name="title"
                defaultValue={challenge ? challenge.title : ''}
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="editor-wrap">
              <Editor
                className="editor"
                name="html"
                value={this.state.html}
                onValueChange={html => this.setState({ html })}
                highlight={html => Prism.highlight(html, Prism.languages.html)}
                padding={10}
                style={{ ...editor }}
                autoComplete="off"
                required
              />
            </div>
            <div className="editor-wrap">
              <Editor
                className="editor"
                name="css"
                value={this.state.css}
                onValueChange={css => this.setState({ css })}
                highlight={css => Prism.highlight(css, Prism.languages.scss)}
                padding={10}
                style={{ ...editor }}
                autoComplete="off"
                required
              />
              {error && (
                <div className="editor-error">
                  <wds-icon type="warn" onClick={onClick}>
                    close
                  </wds-icon>
                  {error}
                </div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <wds-button
              className="delete-button"
              color="red"
              type="dark"
              onClick={onDelete}
            >
              Delete
            </wds-button>
            <button type="submit">
              <wds-button type="dark">Save</wds-button>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ChallengeForm;

ChallengeForm.propTypes = {
  challenge: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string,
    html: PropTypes.string,
    css: PropTypes.string
  }),
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
};
