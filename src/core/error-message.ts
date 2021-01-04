export const ErrorMessage = {
  EntityNotFound: 'ENTITY_NOT_FOUND',
} as const;

export type ErrorMessage = typeof ErrorMessage[keyof typeof ErrorMessage];
