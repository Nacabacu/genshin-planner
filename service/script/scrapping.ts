import { chromium } from 'playwright';
import { Ascension, Dictionary, AscensionMaterial, Rarity, Weapon } from '@shared/items';

(async () => {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();
    const page2 = await browser.newPage();
    await page.goto('https://genshin-impact.fandom.com/wiki/Hunter%27s_Bow', {
        timeout: 0,
    });
    await page2.goto('https://genshin-impact.fandom.com/wiki/Hunter%27s_Bow', {
        timeout: 0,
    });

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
            '5 stars': Rarity.FiveStar,
        };

        function parseId(name: string) {
            return name.replace(`'`, '').toLowerCase().split(' ').join('_');
        }

        for (let index = 0; index < table.length; index += 1) {
            const item = table[index].querySelectorAll('.mw-collapsible-content > .card_container');
            const materials: AscensionMaterial[] = [];

            if (!item?.length) continue;

            for (let itemIndex = 0; itemIndex < item.length; itemIndex += 1) {
                const card = item[itemIndex];
                const name = card.querySelector<HTMLAnchorElement>('.card_image > a')?.title.toLowerCase();
                const quantityString = card.querySelector<HTMLSpanElement>('.card_font')?.innerText;

                if (name === 'mora' || !name || !quantityString) continue;

                materials.push({
                    id: parseId(name),
                    quantity: parseInt(quantityString, 10),
                });
            }

            ascensions.push({
                materials,
            });
        }

        return {
            id: parseId(itemName),
            rarity: rarityMapping[rarity],
            ascensions,
        };
    });

    console.log(JSON.stringify(data));

    await browser.close();
})();
