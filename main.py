from time import *
from math import *
import eel
import os

eel.init("gui")


@eel.expose
def saveScriptSettings(drivingLicense, postcode, email, alerts, date):
    layout = f"Driving-License: {drivingLicense}\nPostcode: {postcode}\nEmail: {email}\nAlerts: {alerts}\nDate: {date}"
    try:
        with open("settings.ini", "w") as file:
            file.write(layout)
            print("Saved to system successfully!")
            eel.returnSaveUpdate("true")
    except:
        print("Failed to save to system!")
        eel.returnSaveUpdate("false")
    
@eel.expose
def loadScriptSettings(style):
    if not os.path.exists("settings.ini"):
        print(f"Save file doesn't exist!")
    else:
        values = []
        keys = []
        with open("settings.ini", "r") as file:
            for items in file:
                if ":" in items:
                    key, value = items.split(":", 1)
                    values.append(value.strip())
                    keys.append(key.strip())
                    
        hasPassedCheck = False
        if "driving-license" in str(keys[0]).lower() and len(values[0]) > 14:
            if "postcode" in str(keys[1]).lower() and len(values[1]) > 3:
                if "email" in str(keys[2]).lower() and len(values[2]) > 4 and "@" in values[2] and "." in values[2]:
                    if "alerts" in str(keys[3]).lower() and len(values[3]) > 3:
                        if "date" in str(keys[4]).lower() and len(values[4]) > 1:
                            hasPassedCheck = True
        
        if hasPassedCheck == True:
            if style == "show":
                eel.returnLoadSaveUpdate("true")
            eel.updateNewSettings(values[0], values[1], values[2], values[3], values[4])
        else:
            if style == "hidden":
                eel.returnLoadSaveUpdate("false")
            print("Corrupt/Incorrect save file detected!")
    
@eel.expose
def saveAppSettings():
    print("")


eel.start("index.html", size=(1080,720))