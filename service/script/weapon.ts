import { Browser } from 'playwright';

const WEAPON_TYPE_URL = [
  'https://genshin-impact.fandom.com/wiki/Bows',
  // 'https://genshin-impact.fandom.com/wiki/Catalysts',
  // 'https://genshin-impact.fandom.com/wiki/Claymores',
  // 'https://genshin-impact.fandom.com/wiki/Polearms',
  // 'https://genshin-impact.fandom.com/wiki/Swords'
];

async function exportWeapon(browser: Browser) {
  const urlList: string[] = [];

  WEAPON_TYPE_URL.forEach(async (url) => {
    const page = await browser.newPage();
    await page.goto(url, { timeout: 0 });

    await page.$eval('body', (element) => {
      const row =
        element.querySelectorAll<HTMLTableElement>('.article-table')[1]
          .tBodies[0].children;

      for (let index = 0; index < row.length; index += 1) {
        const cell = row[index];
        const dataUrl = cell.querySelector<HTMLAnchorElement>('td > a')?.href;

        if (!dataUrl) continue;

        urlList.push(dataUrl);
      }
    });
  });
}

export default exportWeapon;
