export const roots = ['<rootDir>/src'];
export const transform = {
  '^.+\\.tsx?$': 'ts-jest',
};
export const testRegex = '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$';
export const moduleFileExtensions = ['ts', 'tsx', 'js', 'jsx', 'json', 'node'];