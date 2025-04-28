export interface ContainerProps<T> {
  onSuccess?: (data: T) => void;
  onError?: (err?: any) => void;
  onFinished?: () => void;
}
