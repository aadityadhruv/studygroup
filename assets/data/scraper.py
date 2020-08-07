from bs4 import BeautifulSoup
import requests
import csv
from selenium import webdriver
import time

#Automater
chrome_b = webdriver.Chrome('./chromedriver')
chrome_b.maximize_window()
chrome_b.get('https://www.graduateshotline.com/gre-word-list.html')
assert 'list - 2' in chrome_b.page_source
button = chrome_b.find_element_by_xpath("//*[@id='loadx4']/a/h2").click()
time.sleep(1)
# chrome_b.find_element_by_xpath("//span[text='list - 2']").click()
new_html=chrome_b.page_source

#Scraper
#res = requests.get('https://www.graduateshotline.com/gre-word-list.html#x2')
soup = BeautifulSoup(new_html, 'html.parser')
tables = soup('table')
#print(tables[0])

print(tables[1])
fields = ['Word', 'Adjective']
data = []
i = 0 

for tr in tables[1].find_all('tr'):
    row = []
    for td in tr.find_all('td'):
        row.append(td.text.strip())
    data.append(row)

FileName = 'GRE_list_5.csv'

import io
with io.open(FileName, "w", encoding="utf-8", newline='') as CSV_file:
    csvwriter = csv.writer(CSV_file)
    csvwriter.writerow(fields)
    csvwriter.writerows(data)

# with open(FileName, 'w', newline='') as CSV_file:
#     csvwriter = csv.writer(CSV_file)
#     csvwriter.writerow(fields)
#     csvwriter.writerows(data)


chrome_b.close()