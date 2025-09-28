import { nestConfig } from '@repo/jest-config';

export default {
	...nestConfig,
	rootDir: __dirname,
	coverageDirectory: '<rootDir>/coverage',
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
		'^@repo/api/(.*)$': '<rootDir>/../../packages/api/src/$1',
		'^@repo/shared/(.*)$': '<rootDir>/../../packages/shared/src/$1',
	},
	moduleDirectories: ['node_modules'],
};
