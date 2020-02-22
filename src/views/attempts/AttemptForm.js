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

import Attempt from './Attempt';

import { FormRow } from '../../styles/forms';
import editor from '../../styles/editor';

import 'prismjs/themes/prism.css';
import '../../styles/editor.scss';
import '../../styles/challenge';

class AttemptForm extends React.Component {
  state = {
    code: this.props.attempt || ''
  };

  onSubmit = event => {
    event.preventDefault();
    const { content } = event.target.elements;
    const values = {
      content: content.value
    };
    return content.checkValidity() && this.props.onSubmit(values);
  };

  render() {
    return (
      <form id="attemptForm" onSubmit={this.onSubmit}>
        <div className="form-wrap">
          <FormRow>
            <Editor
              className="editor"
              name="content"
              value={this.state.code}
              onValueChange={code => this.setState({ code })}
              highlight={code => Prism.highlight(code, Prism.languages.scss)}
              padding={10}
              style={{ ...editor }}
              required
            />
          </FormRow>

          <FormRow className="editor">
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
  attempt: PropTypes.instanceOf(Attempt),
  onSubmit: PropTypes.func
};
