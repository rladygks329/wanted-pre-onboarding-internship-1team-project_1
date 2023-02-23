import React, { useEffect, useState } from 'react';
import Todo from './Todo';
import AddTodo from './AddTodo';
import styled from 'styled-components';
import useApi from '../../hooks/useApi';
import { api } from '../../apis/index';
import { useTodoContext } from './TodoContext';

export default function TodoList({ currentFilter }) {
  const { todos, setTodos } = useTodoContext();

  useEffect(() => {
    api.todo.getTodos().then(res => {
      setTodos(res.data);
    });
  }, []);

  function getFilteredItems(todos, filter) {
    if (filter === 0) {
      return todos;
    } else if (filter === 1) {
      return todos.filter(todo => todo.isCompleted === false);
    } else {
      return todos.filter(todo => todo.isCompleted === true);
    }
  }

  const filteredTodos = getFilteredItems(todos, 0);

  return (
    <Section>
      <AddTodo />
      <TodoBody>
        {todos.map(todo => (
          <Todo key={todo.id} todoObj={todo} />
        ))}
      </TodoBody>
    </Section>
  );
}
const Section = styled.section`
  height: 100%;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
`;

const TodoBody = styled.ul`
  flex: 1 1 auto;
  overflow-y: auto;
`;
