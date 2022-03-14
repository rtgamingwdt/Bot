const puppeteer = require("puppeteer");

module.exports = new class Scraper {

    async getFortniteStats(username) {
        const url = `https://fortnitetracker.com/profile/all/${username}`;

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.goto(url);

        const [el1] = await page.$x('//*[@id="profile"]/div[1]/div/h1/span');
        let name = await el1.getProperty("textContent");
        name = await name.jsonValue()

        const [el2] = await page.$x('//*[@id="profile"]/div[3]/div/div[2]/div[2]/div[2]/div');
        let score = await el2.getProperty("textContent");
        score = await score.jsonValue()

        const [el3] = await page.$x('//*[@id="profile"]/div[3]/div/div[3]/div/div[1]/div[2]/div');
        let wins = await el3.getProperty("textContent");
        wins = await wins.jsonValue()

        const [el4] = await page.$x('//*[@id="profile"]/div[3]/div/div[3]/div/div[2]/div[2]/div');
        let winPercentage = await el4.getProperty("textContent");
        winPercentage = await winPercentage.jsonValue()

        const [el5] = await page.$x('//*[@id="profile"]/div[3]/div/div[3]/div/div[3]/div[2]/div');
        let kills = await el5.getProperty("textContent");
        kills = await kills.jsonValue()
        
    //     const image = await page.evaluate(() => {
    //         const srcs = Array.from(
    //           document.querySelectorAll("img")
    //         ).map((image) => image.getAttribute("src"));
    //         return srcs;
    //   });

        return {
            username: name,
            score: score,
            wins: wins,
            winPercentage: winPercentage,
            kills: kills
        }
    }
}