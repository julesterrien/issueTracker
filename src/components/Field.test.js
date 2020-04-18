import React from 'react';
import renderer from 'react-test-renderer';

import Field from './Field';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Field
        name="fieldName"
        type="text"
        placeholder="placeholder"
        input={{}}
        autoFocus={false}
        meta={{
          touched: true,
          error: true,
        }}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
