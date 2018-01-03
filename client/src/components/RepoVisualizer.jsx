import React from 'react';

const RepoVisualizer = (props) => (
  <div>
    <span>{props.repo_name} by: </span> <span>{props.owner}</span>
  </div>
)

export default RepoVisualizer;