# -*- coding: utf-8 -*-
# ************************************************************
#
#     toio-api.py
#     toio API commands for tangible programming
#
# ************************************************************

import asyncio
from enum import Enum
from toio import *
from quart import Quart
from typing import List
from quart_cors import cors


app = Quart(__name__)
app = cors(app, allow_origin="*")

class Movement(Enum):
    forward = 1
    backward = 2
    left = 3
    right = 4

class Orientation(Enum):
    north = 270
    east = 360
    south = 90
    west = 180
    
class Position:
    def __init__(self, x: int, y: int):
        self.x = x
        self.y = y
        
class PositionChange:
    def __init__(self, x: int, y: int, angle: int):
        self.x = x
        self.y = y
        self.angle = angle
        
class Labyrinth:
    def __init__(self, matrix: List[List[int]], initial_position: Position, initial_orientation: Orientation, target_position: Position):
        self.matrix = matrix
        self.initial_position = initial_position
        self.initial_orientation = initial_orientation
        self.target_position = target_position

"""
    MOVES
    dictionary of movements
"""
moves = {
    Orientation.north: {
        Movement.forward: PositionChange(0, -1, Orientation.north),
        Movement.backward: PositionChange(0, 1, Orientation.south),
        Movement.left: PositionChange(-1, 0, Orientation.west),
        Movement.right: PositionChange(1, 0, Orientation.east)
    },
    Orientation.east: {
        Movement.forward: PositionChange(1, 0, Orientation.east),
        Movement.backward: PositionChange(-1, 0, Orientation.west),
        Movement.left: PositionChange(0, -1, Orientation.north),
        Movement.right: PositionChange(0, 1, Orientation.south)
    },
    Orientation.south: {
        Movement.forward: PositionChange(0, 1, Orientation.south),
        Movement.backward: PositionChange(0, -1, Orientation.north),
        Movement.left: PositionChange(1, 0, Orientation.east),
        Movement.right: PositionChange(-1, 0, Orientation.west)
    },
    Orientation.west: {
        Movement.forward: PositionChange(-1, 0, Orientation.west),
        Movement.backward: PositionChange(1, 0, Orientation.east),
        Movement.left: PositionChange(0, 1, Orientation.south),
        Movement.right: PositionChange(0, -1, Orientation.north)
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
num_rows = 4
num_cols = 6

"""
    LABYRINTH
    matrix: 2D array representing the labyrinth
    initial_position: starting position
    target_position: target position
"""
labyrinth_train = Labyrinth(
    matrix = [
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1]
    ],
    initial_position = Position(6, 4),
    target_position = Position(3, 0),
    initial_orientation= Orientation.north
)

labyrinth_p1 = Labyrinth(
    matrix = [
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 1],
        [0, 0, 0, 0, 1, 0, 0]
    ],
    initial_position = Position(4, 4),
    target_position = Position(3, 0),
    initial_orientation= Orientation.north
)

labyrinth_p2 = Labyrinth(
    matrix = [
        [1, 1, 1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [1, 1, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0]
    ],
    initial_position = Position(2, 4),
    target_position = Position(3, 0),
    initial_orientation= Orientation.north
)

labyrinth_p3 = Labyrinth(
    matrix = [
        [1, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0]
    ],
    initial_position = Position(4, 0),
    target_position = Position(1, 0),
    initial_orientation= Orientation.south
)

labyrinth_p4 = Labyrinth(
    matrix = [
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0]
    ],
    initial_position = Position(4, 4),
    target_position = Position(0, 4),
    initial_orientation= Orientation.north
)

"""
    INITIAL POSITION
"""

initial_pos = {
    "training": [6, 4],
    "map_1": [3,2]
}


""" toio cube """
global cube
cube : ToioCoreCube | None = None

global currposition
currposition = Position | None
global currorientation
currorientation = Orientation | None

"""
    connecting to one toio cube
"""
@app.get("/connect")
async def connect():
    global cube
    global labyrinth
    global currposition
    global currorientation
    device_list = await BLEScanner.scan(1)
    if len(device_list) == 0:
        return "No devices found", 400
    cube = ToioCoreCube(device_list[0].interface)
    await cube.connect()
    
    newcoordinates = get_coordinates(labyrinth_train.initial_position)
    
    await cube.api.motor.motor_control_target(
        timeout=50,
        movement_type=MovementType.Linear,
        speed=Speed(
            max=100, speed_change_type=SpeedChangeType.Constant),
        target=TargetPosition(
            cube_location=CubeLocation(point=Point(x=newcoordinates[0], y=newcoordinates[1]), angle=270),
            rotation_option=RotationOption.AbsoluteOptimal,
        ),
    )
    
    currposition = labyrinth_train.initial_position
    currorientation = labyrinth_train.initial_orientation
    print(currposition)
    
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
    global currorientation
     
    if cube is None:
        return "Cube not connected", 400
    if direction not in Movement.__members__:
        return "Invalid direction", 400
    
    movement = Movement[direction]
    thechange = moves[currorientation][movement]
    newpos = Position(currposition.x +thechange.x, currposition.y+thechange.y)
    neworientation = thechange.angle
    
    if (check_position(newpos)):
        newcoordinates = get_coordinates(newpos)
    
        await cube.api.motor.motor_control_target(
            timeout=70,
            movement_type=MovementType.Linear,
            speed=Speed(
                max=10, speed_change_type=SpeedChangeType.Constant),
            target=TargetPosition(
                cube_location=CubeLocation(point=Point(x=newcoordinates[0], y=newcoordinates[1]), angle=neworientation.value),
                rotation_option=RotationOption.AbsoluteOptimal,
            ),
        )
        
        currposition = newpos
        currorientation = neworientation
        print(currposition)
        
        if (currposition.x == labyrinth_train.target_position.x and currposition.y == labyrinth_train.target_position.y):
            await cube.api.motor.motor_control(40, 0)
            await asyncio.sleep(3)
            await cube.api.motor.motor_control(0, 0)
            return "Finished"
            
        return "Moved"
    
    return "Can't Move"


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
    x = pos.x
    y = pos.y
    index = y * 7 + x
    return mat[index]
    
def check_position(position: Position) -> bool:
    if position.x < 0 or position.x > num_cols:
        return False
    if position.y < 0 or position.y > num_rows:
        return False
    return labyrinth_train.matrix[position.y][position.x] == 1

if __name__ == '__main__':
    app.run(host='0.0.0.0')