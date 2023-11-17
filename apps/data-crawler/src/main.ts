import puppeteer from 'puppeteer';
import fs from 'node:fs';
import path from 'node:path';

const SUPPORT_TYPE_CONST_DATA = `export const AppSupportType = {
  Full: 'Full',
  Partial: 'Partial',
  None: 'None',
} as const;

export type AppSupportType = (typeof AppSupportType)[keyof typeof AppSupportType];
`;

const main = async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
  });
  const page = await browser.newPage();

  await page.goto('https://progressier.com/pwa-vs-native-app-comparison-table/');

  const time = await page.$('time');
  const lastUpdateDateString = await time?.evaluate((time) => time.dateTime);

  const table = await page.$('table');
  const data = await table?.evaluate((table) => {
    const getFeatureSupportType = (classname: string | undefined) => {
      if (!classname) {
        return;
      }
      if (classname.includes('feather-x')) {
        return 'None';
      }
      if (classname.includes('feather-check') && classname.includes('light')) {
        return 'Partial';
      }
      if (classname.includes('feather-check')) {
        return 'Full';
      }
      return;
    };

    const trs = Array.from(table.querySelectorAll('tr'));
    return trs.map((tr, index) => {
      const tds = Array.from(tr.querySelectorAll('td'));
      if (tds.length !== 3) {
        return;
      }

      const title = tds[0].firstChild?.textContent;
      const descriptionDiv = tds[0].querySelector('div:nth-child(2)');
      const description = descriptionDiv?.innerHTML;
      const pwaSupportSpan = tds[1].querySelector('i');
      const nativeAppSupportSpan = tds[2].querySelector('i');
      const pwaSupportType = getFeatureSupportType(pwaSupportSpan?.className);
      const nativeAppSupportType = getFeatureSupportType(nativeAppSupportSpan?.className);

      return {
        index,
        title,
        description,
        pwaSupportType,
        nativeAppSupportType,
      };
    });
  });

  await browser.close();

  const dataToSave = JSON.stringify(data.filter(Boolean), null, 2);
  const filePath = path.join(
    __dirname,
    '../../../../../../apps/client/src/data/compare-features.tsx',
  );

  const updatedAtData = `export const UPDATED_AT = '${lastUpdateDateString}';`;
  const compareFeaturesData = `export const COMPARE_FEATURES = ${dataToSave} as const;`;

  await fs.promises.writeFile(
    filePath,
    `${SUPPORT_TYPE_CONST_DATA}\n${updatedAtData}\n\n${compareFeaturesData}`,
  );
  console.log(`File saved to ${filePath}`);
};

void main();
