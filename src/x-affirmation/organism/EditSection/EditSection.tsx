import React, { useContext, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import PromiseEditor from '../../molecule/PromiseEditor/PromiseEditor';
import { AffirmationContext } from '../../data/context/AffirmationContext';
import { MAX_PROMISE_COUNT } from '../../data/data-client/constant';

export default function EditSection() {
	const promiseListStore = useContext(AffirmationContext);

	const [newPromiseText, setnewPromiseText] = useState('');
	const [isNewPromiseEditorFocused, setisNewPromiseEditorFocused] = useState(true);
	const promiseList = promiseListStore.getPromiseList();

	const focusNewPromiseEditor = () => {
		flushSync(() => {
			setisNewPromiseEditorFocused(false);
		});
		setisNewPromiseEditorFocused(true);
	};

	const onEnter = () => {
		promiseListStore.addPromise(newPromiseText);
		setnewPromiseText('');
		focusNewPromiseEditor();
	};

	const onDelete = (id: string) => () => {
		promiseListStore.deletePromise(id);
		focusNewPromiseEditor();
	};

	return (
  <div data-testid="editSection" className="flex flex-col gap-10">
    {promiseList.map((promise) => (
      <PromiseEditor
        key={promise.id}
        state={promise.text}
        setstate={() => {}}
        onDelete={onDelete(promise.id)}
        isCompleted
      />
			))}

    {promiseList.length < MAX_PROMISE_COUNT && (
    <PromiseEditor
      state={newPromiseText}
      setstate={setnewPromiseText}
      placeholder="새로운 다짐을 입력해주세요."
      onEnter={onEnter}
      isFocused={isNewPromiseEditorFocused}
    />
			)}
  </div>
	);
}
