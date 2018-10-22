export interface FlowContent<TContext> {
  transformed: string;
  ctx: TContext;
}

export interface TransformProps {
  source?: string;
  ctx: any;
}
