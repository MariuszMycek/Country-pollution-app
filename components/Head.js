import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

import 'styles/style.scss';

const defaultDescription = 'Example country pollution app';

const Head = props => (
  <NextHead>
    <meta charSet="UTF-8" />
    <title>{props.title || ''}</title>
    <meta
      name="description"
      content={props.description || defaultDescription}
    />
    <meta
      name="viewport"
      content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <link rel="icon" href="/static/favicon.ico" />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
};

export default Head;
