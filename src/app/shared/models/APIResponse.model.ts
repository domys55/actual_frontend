export interface APIResponse<T> {
    data: T;
    success: boolean;
    errorMessage: string | null;
    statusCode: number;
  }