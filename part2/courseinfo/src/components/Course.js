import React from "react";

const Header = (props) => <h1>{props.name}</h1>;
const Part = (props) => (
  <p>
    {props.name} {props.exercises}
  </p>
);

const Content = (props) => (
  <div>
    {props.parts.map((part) => (
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    ))}
  </div>
);

const Total = (props) => {
  const total = props.parts.reduce((acc, curr) => acc + curr.exercises, 0);
  return (
    <div>
      <b>total of {total} exercises</b>
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header name={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  );
};

export { Header, Part, Content, Total, Course };
