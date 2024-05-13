# -*- coding: utf-8 -*-
# ************************************************************
#
#     toio-api.py
#     toio API commands for tangible programming
#
# ************************************************************

import asyncio
from toio import *
from quart import Quart
app = Quart(__name__)

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
     currposition = position()
    
    await cube.api.motor.motor_control_target(
        timeout=50,
        movement_type=MovementType.Linear,
        speed=Speed(
            max=100, speed_change_type=SpeedChangeType.Constant),
        target=TargetPosition(
            cube_location=CubeLocation(point=Point(x=currposition[0]+45, y=currposition[1]+45), angle=0),
            rotation_option=RotationOption.AbsoluteOptimal,
        ),
    )
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

"""
    command for toio to read map coordinates
"""
# @app.get("/position")
async def position():
    global cube
    if cube is None:
        return "Cube not connected", 400
    position = await cube.api.id_information.read()
    print(position)
    
    return [get_x(str(position)), get_y(str(position))]

def get_x(position):
    return (int(position[38:41]))
    
def get_y(position):
    return (int(position[45:48]))

def get_angle(position):
    return (int(position[57:60]))
 
if __name__ == '__main__':
    app.run(host='0.0.0.0')