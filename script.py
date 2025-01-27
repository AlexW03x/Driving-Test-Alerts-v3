from seleniumbase import SB
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.by import By
from time import *
import eel

def script(drivingLicense, postcode, drivingDate):
    endScript = False
    while(endScript == False):
        with SB(uc=True, locale_code="en", ad_block=True) as bot:
            url = "https://www.gov.uk/book-driving-test"
            url2 = "https://bot.sannysoft.com"
            
            dateReformat = str(drivingDate).split("-")
            #yyyy, mm, dd
            drivingDate = f"{dateReformat[2]}/{dateReformat[1]}/{dateReformat[0][2:4]}"
            #print(drivingDate)
            
            try:
                bot.activate_cdp_mode(url)
                bot.wait_for_element_visible("body", timeout=1)
                bot.cdp.scroll_into_view("a span:contains('Start now')")
                bot.sleep(1)
                bot.cdp.click_link("Start now")
                bot.wait_for_element_visible("body", timeout=2)
                bot.sleep(1)

                bot.switch_to_frame("#main-iframe")
                bot.click("span:contains('Click to verify')")
                eel.updateStatus("Attempting Puzzle...", "text-red-200", "text-blue-200")
                
                count = 0
                while("https://driverpracticaltest.dvsa.gov.uk/application" == str(bot.get_current_url)):
                    count += 1
                    if(count > 5):
                        eel.updateStatus("Puzzle failed, ending script!", "text-blue-200", "text-red-200")
                        endScript = True
                        break
            except:
                eel.updateStatus("Verification Failed!", "text-blue-200", "text-red-200")
            
            #after puzzle is completed
            bot.sleep(1)
            bot.switch_to_default_content()
            bot.wait_for_element_visible("body", timeout=4)
            sleep(1)
            
            #part 1 select option
            try:
                while("s1" in str(bot.get_current_url())):
                    eel.updateStatus("Selecting type of test...", "text-red-200", "text-blue-200")
                    if(bot.is_element_visible("#test-type-car") == True):
                        bot.click('#test-type-car')
                        sleep(0.5)
            except:
                eel.updateStatus("Couldn't find test type!", "text-blue-200", "text-red-200")
                pass
                
            #part 2 - driving license and number
            bot.wait_for_element_visible("body", timeout=4)
            try:
                while("s2" in str(bot.get_current_url())):
                    eel.updateStatus("Filling in licence...", "text-red-200", "text-blue-200")
                    if(bot.is_element_visible("#driving-licence") == True):
                        bot.type("#driving-licence", drivingLicense)
                        sleep(0.1)
                        bot.click("#extended-test-no")
                        sleep(0.1)
                        bot.click("#special-needs-none")
                        sleep(0.1)
                        bot.click("#driving-licence-submit")
                        sleep(1)
            except:
                eel.updateStatus("Couldn't find licence element!", "text-blue-200", "text-red-200")
                pass
                
            #part 3 - fill in preferred date
            bot.wait_for_element_visible("body", timeout=4)
            try:
                while("s3" in str(bot.get_current_url())):
                    eel.updateStatus("Selecting date...", "text-red-200", "text-blue-200")
                    if(bot.is_element_visible("#test-choice-calendar") == True):
                        bot.type("#test-choice-calendar", drivingDate)
                        sleep(0.1)
                        bot.click("#driving-licence-submit")
                        sleep(1)
            except:
                eel.updateStatus("Couldn't enter a date!", "text-blue-200", "text-red-200")
                pass
            
            #part 4 - post code
            bot.wait_for_element_visible("body", timeout=4)
            try:
                while("s4" in str(bot.get_current_url())):
                    eel.updateStatus("Entering postcode...", "text-red-200", "text-blue-200")
                    if(bot.is_element_visible("#test-centres-input") == True):
                        bot.type("#test-centres-input", postcode)
                        sleep(0.1)
                        bot.click("#test-centres-submit")
                        sleep(1)
            except:
                eel.updateStatus("Couldn't select test centre!", "text-blue-200", "text-red-200")
                pass
                
            #part 5 - grab availabilities
            bot.wait_for_element_visible("body", timeout=4)
            try:
                results = ""
                while("s5" in str(bot.get_current_url())):
                    eel.updateStatus("Selecting test centre...", "text-red-200", "text-blue-200")
                    if(bot.is_element_visible("#search-results") == True):
                        for tests in bot.find_elements("span.underline h4, span.underline h5"):
                            results += tests.text
                            print(f"{tests.text}")
                        bot.click('a[id*="centre-name"]')
            except:
                eel.updateStatus("No search results!", "text-blue-200", "text-red-200")
                pass
                
            #part 6 - timetable
            bot.wait_for_element_visible("body", timeout=2)
            try:
                eel.updateStatus("Identifying dates...", "text-red-200", "text-blue-200")
                if(bot.is_element_visible("#slot-picker-form") == True):
                    timeslots = []
                    for tests in bot.find_elements('td.BookingCalendar-date--bookable'):
                        timeslots.append(tests.text)
                    
                    sortedTimeSlots = [dates for dates in timeslots if dates and dates.strip()]
                    eel.updateStatus("Dates identified!", "text-red-200", "text-blue-200")
                    for i in sortedTimeSlots:
                        print(i)
            except:
                eel.updateStatus("No available dates!", "text-blue-200", "text-red-200")
            
            sleep(5000)
            endScript = True