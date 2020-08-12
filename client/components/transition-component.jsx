import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group';

export default function Transition(props) {
  return (
    <CSSTransitionGroup
      key={props.view}
      transitionName="transition"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}>
      {props.children}
    </CSSTransitionGroup>
  );
}
