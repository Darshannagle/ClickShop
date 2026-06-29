import puppeteer from "puppeteer";
import { ulid } from "ulid";
import path from "path";
import ejs from "ejs";
import fs from "fs";

// Helpers
import { d, getError, logError } from "@utils";
import { pdfContext, defaultPageSetup } from "./Config";

//Others
import Config from "@config";

// Interfaces
import { IHelperError } from "@common/interface";
import { IPDFGenerate, IPDFGenerateRet } from "./interfaces";

//--------------------------------------------------------------
export default async ({
  content,
  folderName,
  template,
  pageSetup,
  filename,
}: IPDFGenerate): Promise<IPDFGenerateRet | IHelperError> => {
  const ERROR_KEY = "[PDF-HANDLER-GENERATE] -";

  let browser = null;

  try {
    const viewPath = path.resolve(
      Config.APP.ROOT_DIR,
      `views`,
      `pdf`,
      `${template}.ejs`,
    );

    const htmlContent = await ejs.renderFile(viewPath, {
      data: content,
      config: pdfContext,
    });

    browser = await puppeteer.launch({
      // headless: 'new', // For newer Puppeteer versions
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const browserPage = await browser.newPage();
    await browserPage.setContent(htmlContent, {
      waitUntil: "networkidle0",
    } as any);

    const outputDir = path.resolve(Config.BASE_ROOT_DIR, `storage`, folderName);

    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    filename = filename
      ? filename.endsWith(".pdf")
        ? filename
        : `${filename}.pdf`
      : `${ulid()}.pdf`;
    const filePath = path.join(outputDir, filename);

    const pdfPages: any = {
      ...defaultPageSetup,
      ...pageSetup,
      path: filePath,
    };

    const browserPagePdf = await browserPage.pdf(pdfPages);
    if (!browserPagePdf) throw `PDF generation failed`;

    await browser.close();

    return { filename, filePath };
  } catch (e) {
    logError(ERROR_KEY, e);
    return { error: getError(e), errorKey: ERROR_KEY };
  } finally {
    if (browser) await browser.close();
  }
};
