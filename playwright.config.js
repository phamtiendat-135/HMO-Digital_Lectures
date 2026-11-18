import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  timeout: 45000,
  fullyParallel: true,
  reporter: [['list']],
  use: { trace: 'off' },
  projects: [
    { name: 'laptop', use: { viewport: { width: 1024, height: 768 } } },
    { name: 'doc', use: { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 } },
    { name: 'ngang', use: { viewport: { width: 844, height: 390 }, hasTouch: true, isMobile: true, deviceScaleFactor: 2 } },
  ],
});
