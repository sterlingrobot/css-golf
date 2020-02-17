// This is an uncontrolled React form, which is way simpler than
// the normal React controlled form
// https://reactjs.org/docs/uncontrolled-components.html
//
// You can use browser form validation these days, and just
// get the values from the form on submit.

import React from 'react';
import PropTypes from 'prop-types';

import Editor from 'react-simple-code-editor';
import Prism from 'prismjs';
import 'prismjs/components/prism-scss';

import Challenge from './Challenge';

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
    const { title, html, css } = event.target.elements;
    const values = {
      title: title.value,
      html: html.value,
      css: css.value
    };
    return this.props.onSubmit(values);
  };

  render() {
    const {
      props: { challenge }
    } = this;
    return (
      <form id="challengeForm" onSubmit={this.onSubmit}>
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
          </div>

          <div className="form-row">
            <button
              type="submit"
              style={{
                width: '100%',
                appearance: 'none',
                border: 0,
                background: 'none'
              }}
            >
              <wds-button type="dark">Save Challenge</wds-button>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ChallengeForm;

ChallengeForm.propTypes = {
  challenge: PropTypes.instanceOf(Challenge),
  onSubmit: PropTypes.func
};
