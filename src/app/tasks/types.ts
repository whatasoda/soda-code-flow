import * as React from 'react';

export type TaskContext<TProps, PState = {}> = Pick<React.Component<TProps, PState>, 'props' | 'state'>;
