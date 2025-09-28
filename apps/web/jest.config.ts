import { nextConfig } from '@repo/jest-config';
import { pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.json';

export default {
	...nextConfig,
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.(t|j)sx?$': [
			'babel-jest',
			{ configFile: './test/babel.config.cjs' },
		],
	},
	moduleNameMapper: {
		...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	},
};
