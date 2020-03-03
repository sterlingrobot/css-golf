import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import '../../styles/modal.scss';

const Modal = ({ trigger, title, children }) => {
  const [active, setActive] = useState(false);
  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
  });

  return (
    <>
      <div className="modal-trigger" onClick={() => setActive(true)}>
        <wds-icon>{trigger.icon}</wds-icon>
        {trigger.label}
      </div>
      {active && (
        <div className="modal" onClick={() => setActive(false)}>
          <wds-panel title={title} onClick={e => e.stopPropagation()}>
            <wds-icon
              className="close"
              slot="header"
              style={{ cursor: 'pointer' }}
              onClick={() => setActive(false)}
            >
              close
            </wds-icon>
            {children}
          </wds-panel>
        </div>
      )}
    </>
  );
};

export default Modal;

Modal.propTypes = {
  trigger: PropTypes.shape({
    label: PropTypes.string,
    icon: PropTypes.string
  }),
  title: PropTypes.string,
  children: PropTypes.node
};
