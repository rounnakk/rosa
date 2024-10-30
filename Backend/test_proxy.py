import requests
from typing import List
# Test proxy before using:
def load_proxies() -> List[str]:
        # Option 1: Using free-proxy-list.net
        import requests
        from bs4 import BeautifulSoup
        
        url = "https://free-proxy-list.net/"
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        proxies = []
        
        for row in soup.find("table", class_="table table-striped table-bordered").find_all("tr")[1:]:
            tds = row.find_all("td")
            try:
                ip = tds[0].text.strip()
                port = tds[1].text.strip()
                if tds[6].text.strip() == "yes":  # Check if HTTPS
                    proxies.append(f"{ip}:{port}")
            except:
                continue
        
        print(proxies)

def test_proxy(proxy):
    try:
        response = requests.get("https://www.amazon.in", 
                              proxies={"http": proxy, "https": proxy},
                              timeout=10)
        return response.status_code == 200
    except:
        return False
    
output = test_proxy("43.133.59.220:3128")
print(output)