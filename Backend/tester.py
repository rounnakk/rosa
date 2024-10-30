# tester.py
from amazon_scraper import AmazonScraper
import json
import time

def test_scraper():
    scraper = None
    try:
        scraper = AmazonScraper()
        print("Scraper initialized successfully!")
        
        test_url = "https://www.amazon.in/ASUS-i5-12500H-Fingerprint-Transparent-X1605ZAC-MB541WS/dp/B0DGLCTZXX"
        
        print("\nStarting scrape...")
        product = scraper.scrape_product(test_url)
        
        if product:
            print("\nProduct data:")
            print(json.dumps(product, indent=2, ensure_ascii=False))
            
            if product['name'] and product['price']:
                print("\nScraper is working correctly!")
                
                # Save the results
                with open('product_data.json', 'w', encoding='utf-8') as f:
                    json.dump(product, f, ensure_ascii=False, indent=2)
                print("\nResults saved to product_data.json")
            else:
                print("\nScraper needs adjustment - missing name or price")
                if not product['name']:
                    print("- Name not found")
                if not product['price']:
                    print("- Price not found")
        else:
            print("\nFailed to scrape product")
            
    except Exception as e:
        print(f"\nError during testing: {str(e)}")
    finally:
        if scraper:
            try:
                scraper.driver.quit()
                print("\nBrowser closed successfully")
            except:
                print("\nError closing browser")

if __name__ == "__main__":
    test_scraper()