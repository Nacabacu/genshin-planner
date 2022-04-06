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
        // const urlList: string[] = await page.$eval('body', element => {

        // });
    });
}

export default exportWeapon;
