import React from 'react';
import Ul from './Ul';
import Wrapper from './Wrapper';

const styles = {
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    border: 'solid #fabd44',
    borderRadius: '10px',
  },
  colOne: {
    height: '20%',
    margin: '1rem',
    minWidth: '8rem',
  },
  colTwo: {
    height: '20%',
    maxWidth: '30rem',
    margin: '1rem',
  },
};

function List(props) {
  const { rowContainer } = styles;
  const ComponentToRender = props.component;
  let content = <div />;
  // If we have items, render them
  if (props.items) {
    if (props.items === '') {
      return;
    }
    const data = Object.entries(props.items);
    content = data.map((item) => (
      <div key={item[0]} style={rowContainer}>
        <span
          className="product-line"
          key={`item-${Math.random()}`}
          value={item[0]}
        >
          {item[0]}
        </span>
        <span
          className="product-line"
          key={`item-${Math.random()}`}
          value={item[1]}
        >
          {item[1]}
        </span>
      </div>
    ));
  } else {
    // Otherwise render a single component
    content = <ComponentToRender />;
  }

  return (
    <Wrapper>
      <h4 style={{ textAlign: 'center' }}>{props.title}</h4>
      <Ul>{content}</Ul>
    </Wrapper>
  );
}

export default List;
