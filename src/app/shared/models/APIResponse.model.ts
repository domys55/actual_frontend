export interface APIResponse<T> {
    recordCount: number;
    data: T;
    success: boolean;
    errorMessage: string | null;
    statusCode: number;
  }