import { chromium } from 'playwright';
import exportWeapon from './weapon';

async function main() {
  const browser = await chromium.launch({ headless: false });

  await exportWeapon(browser);
}

main();
