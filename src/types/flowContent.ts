export interface FlowContent<TContext> {
  transformed: string;
  ctx: TContext;
}

export interface TransformProps<TContext = any> {
  source: string | undefined;
  ctx: TContext;
}
