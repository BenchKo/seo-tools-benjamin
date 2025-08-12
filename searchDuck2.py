# Wie oft der scraper auf mehr Anzeigen klicken soll...
MAX_CLICKS = 5

from playwright.sync_api import sync_playwright, TimeoutError
from datetime import datetime
import json, csv


# Eigenständige f{}
def searchDuckDuckGo(query,keywords):
    with sync_playwright() as p:
        browser = p.firefox.launch(headless=True)
        page = browser.new_page()
        page.goto(f"https://duckduckgo.com/?q={query.replace(' ','+')}")
        page.wait_for_selector("h2 > a",timeout=5000) # warte kurz bis Ergebnisse geladen werden

        # Seite erweitern 
        loadMore(page,MAX_CLICKS)

        # Alle Links aus Suchergebnissen holen
        links = page.locator("h2 > a").all()
        results = []
        # Wat wa nicht wollen
        exclude_domains = ["about.between-the-lines.de", "app.between-the-lines.de",
        "between-the-lines.de", "about.between-the-lines.info"]

        for link in links:
            href = link.get_attribute('href')
            text = link.inner_text()
            if href and any(domain in href for domain in exclude_domains):
                continue

            for k in keywords:
                if k.lower() in text.lower() or (href and k.lower() in href.lower()):
                    results.append({'title': text,'url': href })
                    break

        # zeitstempel für output
        timestamp = datetime.now().isoformat()
        browser.close()

        return {
            'timestamp': timestamp,
            'query':query,
            'results' : results
        }


# Weitere eigenständige f{}
def loadMore(page, MAX_CLICKS):
    for _ in range(MAX_CLICKS):
        try:
            page.click("#more-results",timeout=5000) # '#' steht für ID
            page.wait_for_selector("h2 > a",timeout=5000)

        except TimeoutError:
            break


# Das ist meine main(){}:
# Definition der keywords-Liste und Suchanfrage-Str
keywords = 'between-the-lines', 'between the lines', 'between the lines e.V.', 'solingen',
'psychische Gesundheit', 'digitale Hilfe', 'btl', 'startup'
query = "between the lines Solingen"
# Suche starten 
data = searchDuckDuckGo(query, keywords)
# Strings zu Liste Dictionaries

# Speichern als Json -> csv
#with open("result.json", "w") as f:
 #   json.dump(data,f,indent=2)

with open("output.csv", "w",newline="",encoding="utf-8") as f:
    writer = csv.DictWriter(f,fieldnames=["title", "url"])
    writer.writeheader()
    writer.writerows(data["results"])

print("Gefundene Links:",len(data["results"])) 

# } xD
