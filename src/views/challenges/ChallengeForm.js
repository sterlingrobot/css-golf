import React from 'react';
import PropTypes from 'prop-types';

import Editor from 'react-simple-code-editor';
import Modal from '../misc/Modal';

import Prism from 'prismjs';
import 'prismjs/components/prism-scss';
import 'prismjs/components/prism-markdown';

import prettier from 'prettier/standalone';
import parserPostcss from 'prettier/parser-postcss';
import parserHtml from 'prettier/parser-html';
import prettierConfig from '../../styles/prettierConfig';

import { TextInput, Select, FormLabel } from '../../styles/forms';
import editor from '../../styles/editor';

import 'prismjs/themes/prism.css';
import '../../styles/form.scss';
import '../../styles/editor.scss';

class ChallengeForm extends React.Component {
  state = {
    hints: this.props.challenge ? this.props.challenge.hints || [] : [],
    html: this.props.challenge ? this.props.challenge.html || '' : '',
    css: this.props.challenge ? this.props.challenge.css || '' : ''
  };

  onSubmit = event => {
    event.preventDefault();
    const target = event.target;
    this.setState(
      {
        html: this.formatCode('html'),
        css: this.formatCode('scss')
      },
      () => {
        const { path, title, par, html, css } = target.elements;
        const values = {
          path: path.value,
          title: title.value,
          hints: this.state.hints,
          par: par.value,
          html: html.value,
          css: css.value
        };
        return this.props.onSubmit(values);
      }
    );
  };

  formatCode = type => {
    const { html, css } = this.state;
    const config = {
      html: {
        parser: parserHtml,
        code: html
      },
      scss: {
        parser: parserPostcss,
        code: css
      }
    };
    const formatted = prettier.format(config[type].code, {
      ...prettierConfig,
      plugins: [config[type].parser],
      parser: type
    });
    return formatted;
  };

  hintTemplate(hint, i) {
    const trigger = hint
      ? { icon: 'edit', label: `Hint #${i + 1}` }
      : { icon: 'add', label: 'Add hint' };
    const title = hint ? `Hint #${i + 1}` : 'Add Hint';
    return (
      <Modal key={i} title={title} trigger={trigger}>
        <div className="editor-wrap" style={{ display: 'grid' }}>
          <Editor
            className="editor"
            name="hints[]"
            value={(hint !== 'NEW' && hint) || ''}
            onValueChange={hint => {
              const hintsEdited = this.state.hints.slice();
              hintsEdited[i] = hint;
              this.setState({ hints: hintsEdited });
            }}
            highlight={hint => Prism.highlight(hint, Prism.languages.markdown)}
            padding={10}
            style={{ ...editor, minWidth: '40em' }}
            placeholder="# Markdown Hint"
            autoComplete="off"
          />
        </div>
      </Modal>
    );
  }

  onNewHintAdded(e) {
    const target = e.target;
    const hints = this.state.hints.slice();
    const newHint = 'NEW';
    hints.push(newHint);
    this.setState(
      { hints },
      setTimeout.bind(null, () => target.previousSibling.click(), 200)
    );
  }

  render() {
    const {
      props: {
        challenge = { path: '', title: '', hints: [], par: 3 },
        error,
        onClick,
        onDelete
      }
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
                defaultValue={challenge.title}
                placeholder="Name this challenge..."
                autoComplete="off"
                required
              />
            </div>
            <div className="form-control" style={{ textAlign: 'right' }}>
              <FormLabel htmlFor="par">Par for this challenge:</FormLabel>
              <Select
                name="par"
                defaultValue={challenge.par}
                autoComplete="off"
                style={{ marginLeft: '1rem' }}
                required
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="challenge-hints">
            {this.state.hints.map(this.hintTemplate.bind(this))}
            <div
              className="modal-trigger"
              onClick={this.onNewHintAdded.bind(this)}
            >
              <wds-icon>add</wds-icon> Add a hint
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
                placeholder="<html></html>"
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
                placeholder=".css{ ... }"
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
    hints: PropTypes.arrayOf(PropTypes.string),
    par: PropTypes.string,
    html: PropTypes.string,
    css: PropTypes.string
  }),
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func,
  onDelete: PropTypes.func
};
