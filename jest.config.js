module.exports = {
  preset: 'ts-jest',  // Menggunakan ts-jest untuk mendukung TypeScript
  testEnvironment: 'node',  // Menggunakan environment node
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1',  // Menyesuaikan alias path 'src'
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',  // Pastikan tsconfig mengarah ke konfigurasi yang benar
    },
  },
};