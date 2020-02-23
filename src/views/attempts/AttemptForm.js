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
    const { css } = event.target.elements;
    const values = {
      css: css.value
    };
    return css.checkValidity() && this.props.onSubmit(values);
  };

  render() {
    const {
      props: { challenge }
    } = this;
    return (
      <form id="attemptForm" onSubmit={this.onSubmit}>
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
  onSubmit: PropTypes.func
};
