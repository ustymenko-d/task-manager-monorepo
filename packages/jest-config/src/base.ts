import type { Config } from 'jest';

export const config = {
	collectCoverage: true,
	coverageDirectory: 'coverage',
	coverageProvider: 'v8',
	moduleFileExtensions: ['js', 'ts', 'json'],
	testEnvironment: 'jsdom',
	clearMocks: true,
} as const satisfies Config;
