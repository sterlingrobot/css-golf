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

import ChallengeMarkup from '../challenges/ChallengeMarkup';

import { FormRow } from '../../styles/forms';
import editor from '../../styles/editor';

import 'prismjs/themes/prism.css';
import '../../styles/form.scss';
import '../../styles/editor.scss';
import '../../styles/challenge';

class AttemptForm extends React.Component {
  state = {
    code: ''
  };

  onSubmit = event => {
    event.preventDefault();
    const { css, path } = event.target.elements;
    const values = {
      path: path.value,
      css: css.value
    };
    return css.checkValidity() && this.props.onSubmit(values);
  };

  render() {
    const { challenge, path, error, onClick } = this.props;
    return (
      <form id="attemptForm" onSubmit={this.onSubmit}>
        <input type="hidden" name="path" defaultValue={path} />
        <div className="form-wrap">
          <FormRow className="form-row">
            <ChallengeMarkup html={challenge.html} />
            <div className="editor-wrap">
              <Editor
                className="editor"
                name="css"
                value={this.state.code}
                placeholder="... you can write SCSS here ..."
                onValueChange={code => this.setState({ code })}
                highlight={code => Prism.highlight(code, Prism.languages.scss)}
                padding={10}
                style={{ ...editor }}
                required
              />
              {error && (
                <div className="attempt-error">
                  <wds-icon type="warn" onClick={onClick}>
                    close
                  </wds-icon>
                  {error}
                </div>
              )}
            </div>
          </FormRow>

          <FormRow>
            <button
              type="submit"
              style={{
                width: '100%',
                appearance: 'none',
                border: 0,
                background: 'none'
              }}
            >
              <wds-button type="dark">Submit Attempt</wds-button>
            </button>
          </FormRow>
        </div>
      </form>
    );
  }
}

export default AttemptForm;

AttemptForm.propTypes = {
  challenge: PropTypes.shape({
    html: PropTypes.string
  }),
  path: PropTypes.string,
  error: PropTypes.string,
  onSubmit: PropTypes.func,
  onClick: PropTypes.func
};
