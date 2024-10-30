# amazon_scraper.py
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import random
import time
import json
import logging
from fake_useragent import UserAgent
from typing import Dict, List, Optional

class AmazonScraper:
    def __init__(self):
        self.setup_logging()
        self.setup_driver()

    def setup_logging(self):
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(levelname)s - %(message)s',
            handlers=[
                logging.FileHandler('amazon_scraper.log'),
                logging.StreamHandler()  # This will print logs to console
            ]
        )
        self.logger = logging.getLogger(__name__)

    def setup_driver(self):
        options = Options()
        options.add_argument('--headless=new')
        options.add_argument('--disable-gpu')
        options.add_argument('--window-size=1920,1080')  # Set a standard resolution
        options.add_argument('--no-sandbox')
        options.add_argument('--disable-dev-shm-usage')
        
        # Set a stable user agent instead of random one
        user_agent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        options.add_argument(f'--user-agent={user_agent}')
        
        service = Service()
        self.driver = webdriver.Chrome(service=service, options=options)
        self.logger.info("WebDriver initialized successfully")

    def extract_with_retry(self, xpath: str, max_retries: int = 3) -> Optional[str]:
        self.logger.info(f"Attempting to extract element with xpath: {xpath}")
        for attempt in range(max_retries):
            try:
                element = WebDriverWait(self.driver, 10).until(
                    EC.presence_of_element_located((By.XPATH, xpath))
                )
                value = element.text or element.get_attribute('src')
                self.logger.info(f"Successfully extracted value: {value}")
                return value
            except TimeoutException:
                self.logger.warning(f"Attempt {attempt + 1}/{max_retries} failed for xpath: {xpath}")
                if attempt == max_retries - 1:
                    return None
                time.sleep(random.uniform(2, 4))

    def scrape_product(self, url: str) -> Dict:
        try:
            self.logger.info(f"Navigating to URL: {url}")
            self.driver.get(url)
            time.sleep(5)  # Increased initial wait time
            
            # Log the current page title and URL to verify we're on the right page
            self.logger.info(f"Current page title: {self.driver.title}")
            self.logger.info(f"Current URL: {self.driver.current_url}")
            
            # Save page source for debugging (optional)
            with open('page_source.html', 'w', encoding='utf-8') as f:
                f.write(self.driver.page_source)
            
            # Updated XPath selectors for Amazon India
            product_data = {
                'name': self.extract_with_retry("//span[@id='productTitle']"),
                'price': self.extract_price(),
                'description': self.extract_with_retry("//div[@id='productDescription']//p") or 
                             self.extract_with_retry("//div[@id='feature-bullets']//li"),
                'images': self.extract_images(),
                'url': url,
                'timestamp': time.strftime('%Y-%m-%d %H:%M:%S')
            }
            
            self.logger.info(f"Extracted product data: {json.dumps(product_data, ensure_ascii=False)}")
            return product_data

        except Exception as e:
            self.logger.error(f"Error scraping URL {url}: {str(e)}", exc_info=True)
            return None

    def extract_price(self) -> Optional[str]:
        price_xpaths = [
            "//span[@class='a-price-whole']",
            "//span[@class='a-price']//span[@class='a-offscreen']",
            "//span[@id='priceblock_ourprice']",
            "//span[@id='priceblock_dealprice']",
            "//span[contains(@class, 'a-price-whole')]"
        ]
        
        for xpath in price_xpaths:
            price = self.extract_with_retry(xpath)
            if price:
                self.logger.info(f"Found price: {price}")
                return price.strip()
        
        self.logger.warning("No price found with any of the known XPaths")
        return None

    def extract_images(self) -> List[str]:
        images = []
        try:
            # Try multiple image selectors
            image_xpaths = [
                "//div[@id='imgTagWrapperId']/img",
                "//div[@id='main-image-container']//img",
                "//div[@id='imageBlock']//img"
            ]
            
            for xpath in image_xpaths:
                elements = self.driver.find_elements(By.XPATH, xpath)
                for elem in elements:
                    src = elem.get_attribute('src')
                    if src and 'sprite' not in src and src not in images:
                        images.append(src)
                        self.logger.info(f"Found image: {src}")
            
        except Exception as e:
            self.logger.error(f"Error extracting images: {str(e)}")
        
        return images

    def __del__(self):
        if hasattr(self, 'driver'):
            self.driver.quit()