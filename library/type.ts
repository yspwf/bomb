export const enum methodType {
  Post = 'post',
  Get = 'get',
  Put = 'put',
  Delete = 'delete',
  Batch = 'batch'
}

export interface MethodMetadata{
  method: methodType,
  path: string,
  fn: Function
}