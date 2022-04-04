import 'module-alias/register';
import puppeteer from 'puppeteer';
import { Ascension, Dictionary, AscensionMaterial, Rarity, Weapon } from '@shared/items';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://genshin-impact.fandom.com/wiki/Hunter%27s_Bow');

    const data: Weapon | null = await page.$eval('body', (element) => {
        const itemName = element.querySelector('.pi-title')?.innerHTML;
        const rarity = element.querySelector<HTMLImageElement>('[data-source="rarity"] > div > img')?.title.toLowerCase();
        const table = element.querySelector<HTMLTableElement>('.wikitable >tbody')?.children;
        const ascensions: Ascension[] = [];

        if (!itemName || !rarity || !table) return null;

        const rarityMapping: Dictionary<Rarity> = {
            '1 star': Rarity.OneStar,
            '2 stars': Rarity.TwoStar,
            '3 stars': Rarity.ThreeStar,
            '4 stars': Rarity.FourStar,
            '5 stars': Rarity.FiveStar
        };

        function parseId(name: string) {
            return name.replace(`'`, '').toLowerCase().split(' ').join('_');
        }

        for (let index = 0; index < table.length; index++) {
            const item = table[index].querySelectorAll('.mw-collapsible-content > .card_container');
            const materials: AscensionMaterial[] = [];

            if (!item?.length) continue;

            for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
                const card = item[itemIndex];
                const itemName = card.querySelector<HTMLAnchorElement>('.card_image > a')?.title.toLowerCase();
                const quantityString = card.querySelector<HTMLSpanElement>('.card_font')?.innerText;

                if (itemName === 'mora' || !itemName || !quantityString) continue;

                materials.push({
                    id: parseId(itemName),
                    quantity: parseInt(quantityString)
                });
            }

            ascensions.push({
                materials
            })
        }

        return {
            id: parseId(itemName),
            rarity: rarityMapping[rarity],
            ascensions
        }
    });

    console.log(JSON.stringify(data));

    await browser.close();
})();