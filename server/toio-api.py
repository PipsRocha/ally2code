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
    x: index 
    y: right motor speed
    a: 
"""
moves = {
    "forward": {
        "x": 0,
        "y": -1
    },
    "backward": {
        "x": 0,
        "y": 1
    },
    "left": {
        "x": -1,
        "y": 0
    },
    "right": {
        "x": 1,
        "y": 0
    }
}


"""
    MAT COORDINATES
    coordinates for the center of each square
    for simple mat: (98, 142) - (402, 358)
"""
mat = [
    [119,163], [163,163], [206,163], [250,163], [293,163], [336,163], [380,163],
    [119,206], [163,206], [206,206], [250,206], [293,206], [336,206], [380,206],
    [119,250], [163,250], [206,250], [250,250], [293,250], [336,250], [380,250],
    [119,293], [163,293], [206,293], [250,293], [293,293], [336,293], [380,293],
    [119,336], [163,336], [206,336], [250,336], [293,336], [336,336], [380,336]
]


initial_pos = {
    "training": [6, 4],
    "map_1": [3,2]
}


""" toio cube """
global cube
cube : ToioCoreCube | None = None

global currposition

"""
    connecting to one toio cube
"""
@app.get("/connect")
async def connect():
    global cube
    global currposition
    device_list = await BLEScanner.scan(1)
    if len(device_list) == 0:
        return "No devices found", 400
    cube = ToioCoreCube(device_list[0].interface)
    await cube.connect()
    
    currposition = initial_pos["training"]
    print(currposition)
    
    currcoordinates = get_coordinates(currposition)
    
    await cube.api.motor.motor_control_target(
        timeout=50,
        movement_type=MovementType.Linear,
        speed=Speed(
            max=10, speed_change_type=SpeedChangeType.Constant),
        target=TargetPosition(
            cube_location=CubeLocation(point=Point(x=currcoordinates[0], y=currcoordinates[1]), angle=270),
            rotation_option=RotationOption.AbsoluteOptimal,
        ),
    )
    
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
    global currposition
     
    if cube is None:
        return "Cube not connected", 400
    if direction not in moves:
        return "Invalid direction", 400
        
    move = moves[direction]
    newpos = [currposition[0] + move["x"], currposition[1] + move["y"]]
    newcoordinates = get_coordinates(newpos)
    
    await cube.api.motor.motor_control_target(
        timeout=50,
        movement_type=MovementType.Linear,
        speed=Speed(
            max=10, speed_change_type=SpeedChangeType.Constant),
        target=TargetPosition(
            cube_location=CubeLocation(point=Point(x=newcoordinates[0], y=newcoordinates[1]), angle=0),
            rotation_option=RotationOption.AbsoluteOptimal,
        ),
    )
    currposition = newpos
    
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
    global currposition
    if cube is None:
        return "Cube not connected", 400
    position = await cube.api.id_information.read()
    print(position)
    
    currposition = [get_x(str(position)), get_y(str(position))]
    
    return currposition

def get_x(position):
    return (int(position[38:41]))
    
def get_y(position):
    return (int(position[45:48]))

def get_angle(position):
    return (int(position[57:60]))

def get_coordinates(pos):
    x = pos[0]
    y = pos[1]
    index = y * 7 + x
    return mat[index]
    
 
if __name__ == '__main__':
    app.run(host='0.0.0.0')