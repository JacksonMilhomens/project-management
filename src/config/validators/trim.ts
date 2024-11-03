import { Transform, TransformOptions } from 'class-transformer';

export function Trim(transformOptions?: TransformOptions): (target: any, key: string) => void {
  return Transform(({ value }: any) => {
    if (typeof value !== 'string' || !value) return value;
    return value.trim();
  }, transformOptions);
}
