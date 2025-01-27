from time import *
from math import *
import eel
import os
import tkinter as tk
from tkinter import filedialog
from script import *

eel.init("gui")

##global variables for holding info##
global drivingLicenseVar
global postcodeVar
global emailVar
global alertsVar
global dateVar
global apiKeyVar
global autoRunVar
global autoRunCooldownVar

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
def loadScriptSettings(style, filename):
    if not os.path.exists(filename):
        print(f"Save file doesn't exist!")
    else:
        values = []
        keys = []
        with open(filename, "r") as file:
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
            global drivingLicenseVar
            global postcodeVar
            global emailVar
            global alertsVar
            global dateVar
            drivingLicenseVar = values[0]
            postcodeVar = values[1]
            emailVar = values[2]
            alertsVar = values[3]
            dateVar = values[4]
            print("Save loaded successfully!")
        else:
            if style == "hidden":
                eel.returnLoadSaveUpdate("false")
            print("Corrupt/Incorrect save file detected!")
            
@eel.expose
def loadFromFile(style, filename):
    if filename == "" or filename == None or len(filename) < 1:
        root = tk.Tk()
        root.attributes("-topmost", True)
        root.withdraw()
        path = filedialog.askopenfilename(title="Select save file", filetypes=(("Save/Config Files", "*.ini"), ("All Files", "*.*")))
        if path:
            filename = path
            print(f"File chosen: {filename}")
        else:
            print("No file chosen.")
        root.destroy()
    
    loadScriptSettings(style, filename)
            
    
@eel.expose
def saveAppSettings(theme):
    layout=f"Theme: {theme}"
    try:
        with open("app.ini", "w") as file:
            file.write(layout)
            print("Saved to system successfully!")
            eel.saveOthersCheck("true")
    except Exception as e:
        print("Failed to save to system!")
        eel.saveOthersCheck("false")
        
@eel.expose
def loadAppSettings():
    if not os.path.exists("app.ini"):
        print("App configuration doesn't exist!")
    else:
        values = []
        keys = []
        with open("app.ini", "r") as file:
            for items in file:
                if ":" in items:
                    key, value = items.split(":", 1)
                    values.append(value.strip())
                    keys.append(key.strip())
                    
        hasPassedCheck = False
        if len(str(values[0])) > 3:
            hasPassedCheck = True
        
        if hasPassedCheck == True:
            eel.updateApp(values[0])
            print("App data save loaded!")
        else:
            print("App data save failed to load!")
        
@eel.expose
def launchScript(drivingLicense, postcode, date):
    script(drivingLicense, postcode, date)
    
@eel.expose
def printStatement(statement):
    print(statement)

eel.start("index.html", size=(1080,720))