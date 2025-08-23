import { Logger } from '@nestjs/common';

export const handleRequest = async <T>(
  handler: () => Promise<T>,
  errorMessage: string,
  logger: Logger,
): Promise<T> => {
  try {
    return await handler();
  } catch (error) {
    if (error instanceof Error) {
      logger.error(errorMessage, error.stack);
    } else {
      logger.error(errorMessage, JSON.stringify(error));
    }
    throw error;
  }
};
