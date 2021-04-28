module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: { '^.+\\.(ts|tsx|js|jsx)?$': 'ts-jest' },
  testPathIgnorePatterns: ['./tests/dist'],
}
