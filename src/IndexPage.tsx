import React from 'react';

const IndexPage: React.FC<{ urls: { link: string; name: string }[] }> = ({
  urls,
}) => {
  const content = urls.map(({ link, name }) => (
    <li key={name}>
      <a href={link}>{name}</a>
    </li>
  ));

  return <ul>{content}</ul>;
};

export default IndexPage;
