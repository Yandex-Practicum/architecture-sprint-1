const fs = require('fs');
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const waitPort = require('wait-port');

describe('Микрофронтенд директории', () => {
  test('Проверка на наличие директорий, которые в названии имеют слово microfrontend', () => {
    const dirs = fs.readdirSync('./', { withFileTypes: true });
    const hasDirs = dirs.some((item) =>
      item.isDirectory() && item.name.includes('microfrontend')
    );

    expect(hasDirs).toBe(true);
  });
});

describe('Сборка проекта', () => {
  test('Наличие файла index.html в директории public после сборки', () => {
    const fileExists = fs.existsSync('./public/index.html',);

    expect(fileExists).toBe(true);
  });
});

describe('Запуск проекта', () => {
  jest.setTimeout(30000);
  let page;
  let browser;
  let yarnProcess;

  beforeAll(async () => {
    yarnProcess = spawn('yarn', ['start'], { detached: true });
    await waitPort({ host: 'localhost', port: 3000 });
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    process.kill(-yarnProcess.pid);
  })

  test('Проверка корректности работы, при открытии страницы index.html', async () => {
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.page__content');
    const element = await page.locator('.page__content');
    expect(element).not.toBeNull();
  });
});
