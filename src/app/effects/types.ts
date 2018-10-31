import * as React from 'react';

export type EffectContext<TProps, PState = {}> = Pick<React.Component<TProps, PState>, 'props' | 'state'>;
