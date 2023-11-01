/**
 * @License
 * Copyright 2023 Orion Services @ https://github.com/orion-services
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package dev.orion.talk.system;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.interactions.Actions;

public class SeleniumTest {

    static WebDriver driver;
    static Map<String, Object> vars;
    static JavascriptExecutor js;

    @BeforeAll
    public static void setUp() {

        ChromeOptions options = new ChromeOptions();
        options.addArguments("--headless");
        options.addArguments("--disable-gpu");
        driver = new ChromeDriver(options);
        js = (JavascriptExecutor) driver;
        vars = new HashMap<String, Object>();
    }

    @AfterAll
    public static void tearDown() {
        driver.quit();
    }

    @Test
    @Order(1)
    void createChannel() {

        // Wait for 2 seconds to load the page
        Duration duration = Duration.ofSeconds(2);

        driver.get("http://127.0.0.1:5173/");
        driver.manage().window().setSize(new Dimension(1280, 1055));
        driver.findElement(By.cssSelector("input")).click();
        driver.findElement(By.cssSelector("input")).sendKeys("my channel");
        driver.findElement(By.cssSelector("input")).sendKeys(Keys.ENTER);
        driver.findElement(By.cssSelector("button")).click();
        driver.findElement(By.cssSelector("input")).click();

        driver.manage().timeouts().implicitlyWait(duration);

        assertTrue(driver.findElement(By.cssSelector("h2"))
                .getText().matches("^[\\s\\S]*Hash[\\s\\S]*$"));
    }

    @Test
    @Order(2)
    void sendMessage() {
        // Wait for 2 seconds to load the page
        Duration duration = Duration.ofSeconds(3);

        driver.get("http://127.0.0.1:5173/");
        driver.manage().window().setSize(new Dimension(1280, 1055));
        driver.findElement(By.cssSelector("input")).click();
        driver.findElement(By.cssSelector("input")).sendKeys("my channel");
        driver.findElement(By.cssSelector("button")).click();

        driver.manage().timeouts().implicitlyWait(duration);

        {
            WebElement element = driver.findElement(By.cssSelector("button"));
            Actions builder = new Actions(driver);
            builder.moveToElement(element).perform();
        }

        driver.manage().timeouts().implicitlyWait(duration);

        driver.findElement(By.cssSelector("input")).click();
        driver.findElement(By.cssSelector("input")).sendKeys("hello");
        driver.findElement(By.cssSelector("button")).click();
        assertTrue(driver.findElement(
            By.cssSelector("div:nth-child(7)"))
            .getText()
            .matches("^[\\s\\S]*hello[\\s\\S]*$"));

    }
}
