import React from 'react';
import PropTypes from 'prop-types';

import Ul from './Ul';
import Wrapper from './Wrapper';

function List(props) {
  const ComponentToRender = props.component;
  let content = <div />;
  // If we have items, render them
  if (props.items) {
    if (props.items === '') {
      return;
    }
    const data = Object.entries(props.items);
    content = data.map((item) => (
      <div key={item[0]} style={{ display: 'flex', flexDirection: 'row' }}>
        <li
          style={{ height: '10%', color: 'red', border: 'solid red' }}
          key={`item-${Math.random()}`}
          value={item[0]}
        >
          {item[0]}
        </li>
        <li
          style={{ height: '20%', color: 'red', border: 'solid red' }}
          key={`item-${Math.random()}`}
          value={item[1]}
        >
          {item[1]}
        </li>
      </div>
    ));
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <Ul>{content}</Ul>
    </Wrapper>
  );
}

List.propTypes = {
  component: PropTypes.func.isRequired,
  items: PropTypes.object,
};

export default List;
