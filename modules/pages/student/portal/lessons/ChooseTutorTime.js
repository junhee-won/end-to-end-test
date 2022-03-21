const { ThenableWebDriver } = require('selenium-webdriver');
const { Builder, By, Key, until } = require('selenium-webdriver');

class ChooseTutorTime {
  constructor(driver, page) {
    this.driver = driver;
    this.page = page;
  }
  async test() {
    let isChoosen = false;

    try {
      // 수업이 있는 튜터가 있을 때까지 반복
      // Choose Tutor
      for (let tutorIter = 1; tutorIter<=5; tutorIter++)
      {
        if (isChoosen) break;

        let xpath = By.xpath('/html/body/div/div/div[2]/div/div[2]/div/div[2]/div/div/div[3]/div/a[' + tutorIter + ']');
        let element = await this.driver.findElement(xpath);
        await this.driver.executeScript("arguments[0].click();", element);
        await this.driver.actions().pause(3000).perform();
        
        // choose Day
        for (let dayIter = 1; dayIter <= 7; dayIter++)
        {
          if (isChoosen) break;

          // choose time
          for (let timeIter = 3; timeIter <= 40; timeIter++) {
            if (isChoosen) break;

            try {
              xpath = By.xpath('/html/body/div/div/div[2]/div/div[2]/div/div[3]/div/div[2]/div/div[2]/div/div[2]/div/div/div/div['+dayIter+']/div['+timeIter+']/div[3]/div');
              let text = await this.driver.findElement(xpath).getText();

              if (text === 'Available') {
                isChoosen = true;
                console.log('---------------------------------------');

                xpath = By.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div[3]/div/div[2]/div/div[2]/div/div[2]/div/div/div/div[4]/div[5]/div[1]')
                element = this.driver.findElement(xpath);

                console.log(element);
                const actions = this.driver.actions({async: true});
                await actions.move({origin: element}).perform();
                
                xpath = By.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div[3]/div/div[2]/div/div[2]/div/div[2]/div/div/div/div[4]/div[5]');
                element = await this.driver.findElement(xpath);
                element.getAttribute('class')
                .then(function(classes) {
                  console.log(classes);
                  return(classes);
                })
                // click 수업
                xpath = By.xpath('/html/body/div[1]/div/div[2]/div/div[2]/div/div[3]/div/div[2]/div/div[2]/div/div[2]/div/div/div/div[4]/div[5]/div[1]');
                element = await this.driver.findElement(xpath);
                

                await this.driver.executeScript("arguments[0].click();", element);
                await this.driver.actions().pause(3000).perform();
                // await this.driver.sleep(100000);
              }
            } catch {
            }
          }
        }
      }

      // next button
      let xpath = By.xpath('/html/body/div[3]/div/div/div/div[2]/div/div[2]/div[2]/button');
      let element = await this.driver.findElement(xpath);
      await this.driver.executeScript("arguments[0].click();", element);
      await this.driver.actions().pause(3000).perform();

      xpath = By.xpath('/html/body/div/div/div[2]/div/div[1]/div/div/div/div[8]/button');
      element = await this.driver.findElement(xpath);
      await this.driver.executeScript("arguments[0].click();", element);
      await this.driver.actions().pause(3000).perform();
    } catch {
      console.log("Error - modules/pages/student/portal/lessons/ChooseTutorTime.js")
    } finally {
    }
  }
}

module.exports = ChooseTutorTime