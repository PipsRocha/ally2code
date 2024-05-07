# -*- coding: utf-8 -*-
# ************************************************************
#
#     toio-api.py
#     toio API commands for tangible programming
#
# ************************************************************

import asyncio
from toio import *
from flask import Flask
app = Flask(__name__)

"""
   directions for toio movements
    x: left motor speed
    y: right motor speed
"""
moves = {
    "forward": {
        "x": 10,
        "y": 10
    },
    "backward": {
        "x": -10,
        "y": -10
    },
    "left": {
        "x": 3,
        "y": 8
    },
    "right": {
        "x": 8,
        "y": 3
    }
}


""" toio cube """
global cube
cube : ToioCoreCube | None = None


"""
    connecting to one toio cube
"""
@app.get("/connect")
async def connect():
    global cube
    device_list = await BLEScanner.scan(1)
    if len(device_list) == 0:
        return "No devices found", 400
    cube = ToioCoreCube(device_list[0].interface)
    await cube.connect()
    return "Connected"


"""
    disconnecting toio cube
"""
@app.get("/disconnect")
async def disconnect():
    global cube
    if cube is None:
        return "Cube not connected", 400
    
    await cube.disconnect()
    cube = None
    return "Disconnected"


"""
    moving toio in four directions
    <direction>: forward, backward, left, right
    x: left motor speed
    y: right motor speed
"""    
@app.get("/move/<direction>")
async def move(direction):
    global cube
    if cube is None:
        return "Cube not connected", 400
    if direction not in moves:
        return "Invalid direction", 400
    
    move = moves[direction]
    await cube.api.motor.motor_control(move["x"], move["y"])
    await asyncio.sleep(2)
    await cube.api.motor.motor_control(0, 0)
    return "Moved"


"""
    command for toio to dance, movement and 8-bit sounds
"""
@app.get("/dance")
async def dance():
    global cube
    if cube is None:
        return "Cube not connected", 400

    await cube.api.motor.motor_control(40, 0)
    await asyncio.sleep(3)
    await cube.api.motor.motor_control(0, 0)
    return "Danced"



if __name__ == '__main__':
    app.run(host='0.0.0.0')