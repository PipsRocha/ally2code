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
    front = 1
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
    def __init__(
        self,
        matrix: List[List[int]],
        initial_position: Position,
        initial_orientation: Orientation,
        target_position: Position,
    ):
        self.matrix = matrix
        self.initial_position = initial_position
        self.initial_orientation = initial_orientation
        self.target_position = target_position


# MOVES
# Dictionary with the possible movements of the toio cube
moves = {
    Orientation.north: {
        Movement.front: PositionChange(0, -1, Orientation.north),
        Movement.backward: PositionChange(0, 1, Orientation.south),
        Movement.left: PositionChange(-1, 0, Orientation.west),
        Movement.right: PositionChange(1, 0, Orientation.east),
    },
    Orientation.east: {
        Movement.front: PositionChange(1, 0, Orientation.east),
        Movement.backward: PositionChange(-1, 0, Orientation.west),
        Movement.left: PositionChange(0, -1, Orientation.north),
        Movement.right: PositionChange(0, 1, Orientation.south),
    },
    Orientation.south: {
        Movement.front: PositionChange(0, 1, Orientation.south),
        Movement.backward: PositionChange(0, -1, Orientation.north),
        Movement.left: PositionChange(1, 0, Orientation.east),
        Movement.right: PositionChange(-1, 0, Orientation.west),
    },
    Orientation.west: {
        Movement.front: PositionChange(-1, 0, Orientation.west),
        Movement.backward: PositionChange(1, 0, Orientation.east),
        Movement.left: PositionChange(0, 1, Orientation.south),
        Movement.right: PositionChange(0, -1, Orientation.north),
    },
}


# MAT COORDINATES
# Coordinates for the center of each square
# For simple mat: (98, 142) - (402, 358)
mat = [
    [
        Point(119, 163),
        Point(163, 163),
        Point(206, 163),
        Point(250, 163),
        Point(293, 163),
        Point(336, 163),
        Point(380, 163),
    ],
    [
        Point(119, 206),
        Point(163, 206),
        Point(206, 206),
        Point(250, 206),
        Point(293, 206),
        Point(336, 206),
        Point(380, 206),
    ],
    [
        Point(119, 250),
        Point(163, 250),
        Point(206, 250),
        Point(250, 250),
        Point(293, 250),
        Point(336, 250),
        Point(380, 250),
    ],
    [
        Point(119, 293),
        Point(163, 293),
        Point(206, 293),
        Point(250, 293),
        Point(293, 293),
        Point(336, 293),
        Point(380, 293),
    ],
    [
        Point(119, 336),
        Point(163, 336),
        Point(206, 336),
        Point(250, 336),
        Point(293, 336),
        Point(336, 336),
        Point(380, 336),
    ],
]
num_rows = 5
num_cols = 7

# LABYRINTHS
labyrinth_train = Labyrinth(
    matrix=[
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1],
    ],
    initial_position=Position(6, 4),
    target_position=Position(3, 0),
    initial_orientation=Orientation.north,
)

labyrinth_p1 = Labyrinth(
    matrix=[
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 0, 0, 1, 1, 0],
        [0, 0, 0, 0, 1, 0, 0],
    ],
    initial_position=Position(4, 4),
    target_position=Position(3, 0),
    initial_orientation=Orientation.north,
)

labyrinth_p2 = Labyrinth(
    matrix=[
        [1, 1, 1, 1, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0],
    ],
    initial_position=Position(2, 4),
    target_position=Position(3, 0),
    initial_orientation=Orientation.north,
)

labyrinth_p3 = Labyrinth(
    matrix=[
        [1, 1, 0, 0, 1, 0, 0],
        [1, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 1, 0, 0],
    ],
    initial_position=Position(4, 0),
    target_position=Position(1, 0),
    initial_orientation=Orientation.south,
)

labyrinth_p4 = Labyrinth(
    matrix=[
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 0, 1, 1, 1],
        [1, 0, 1, 0, 1, 0, 0],
        [1, 0, 1, 1, 1, 0, 0],
    ],
    initial_position=Position(0, 4),
    target_position=Position(6, 2),
    initial_orientation=Orientation.north,
)

labyrinth_p5 = Labyrinth(
    matrix=[
        [0, 0, 0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0, 1, 1],
        [0, 0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 1, 0, 1],
        [0, 0, 0, 0, 1, 1, 1],
    ],
    initial_position=Position(2, 2),
    target_position=Position(0, 5),
    initial_orientation=Orientation.east,
)

labyrinth_p6 = Labyrinth(
    matrix=[
        [0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0],
    ],
    initial_position=Position(6, 3),
    target_position=Position(6, 0),
    initial_orientation=Orientation.west,
)


# toio cube
global cube
cube: ToioCoreCube | None = None

green = IndicatorParam(duration_ms=0, color=Color(r=0, g=255, b=0))

yellow = IndicatorParam(duration_ms=0, color=Color(r=255, g=255, b=0))

purple = IndicatorParam(duration_ms=0, color=Color(r=238, g=130, b=238))

# labyrinth
global currlabyrinth
currlabyrinth = Labyrinth
global currposition
currposition = Position | None
global currorientation
currorientation = Orientation | None


# Connect the toio cube and move it to the initial position
# Returns:
# - "Connected" if the connection is successful
# - "No devices found" if no devices are found
@app.get("/connect")
async def connect():
    global cube
    global currposition
    global currorientation
    global currlabyrinth

    device_list = await BLEScanner.scan(1)
    if len(device_list) == 0:
        return "No devices found", 400
    cube = ToioCoreCube(device_list[0].interface)
    await cube.connect()

    await cube.api.indicator.turn_on(yellow)

    currlabyrinth = labyrinth_train
    newcoordinates = get_coordinates(currlabyrinth.initial_position)

    await cube.api.motor.motor_control_target(
        timeout=50,
        movement_type=MovementType.Linear,
        speed=Speed(max=100, speed_change_type=SpeedChangeType.Constant),
        target=TargetPosition(
            cube_location=CubeLocation(point=newcoordinates, angle=270),
            rotation_option=RotationOption.AbsoluteOptimal,
        ),
    )

    currposition = currlabyrinth.initial_position
    currorientation = currlabyrinth.initial_orientation
    print(currposition.x, currposition.y)

    return "Connected"


# Disconnect the toio cube
# Returns:
# - "Cube not connected" if the cube is not connected
# - "Disconnected" if the disconnection is successful
@app.get("/disconnect")
async def disconnect():
    global cube
    if cube is None:
        return "Cube not connected", 400
    await cube.disconnect()
    cube = None
    return "Disconnected"


# Move the toio cube in the specified direction
# <direction>: front, backward, left, right
# Returns:
# - "Cube not connected" if the cube is not connected
# - "Invalid direction" if the specified direction is not valid
# - "No movement" if the movement is not possible
# - "Moved" if the movement is successful
# - "Finished" if the target position is reached
@app.get("/move/<direction>")
async def move(direction):
    global cube
    global currposition
    global currorientation
    global currlabyrinth

    if cube is None:
        return "Cube not connected", 400
    if direction not in Movement.__members__:
        return "Invalid direction", 400

    movement = Movement[direction]
    thechange = moves[currorientation][movement]
    newpos = Position(currposition.x + thechange.x, currposition.y + thechange.y)
    neworientation = thechange.angle

    if check_position(newpos):
        newcoordinates = get_coordinates(newpos)

        await cube.api.motor.motor_control_target(
            timeout=50,
            movement_type=MovementType.Linear,
            speed=Speed(max=10, speed_change_type=SpeedChangeType.Constant),
            target=TargetPosition(
                cube_location=CubeLocation(
                    point=newcoordinates,
                    angle=neworientation.value,
                ),
                rotation_option=RotationOption.AbsoluteOptimal,
            ),
        )

        currposition = newpos
        currorientation = neworientation
        print(currposition)

        if (
            currposition.x == currlabyrinth.target_position.x
            and currposition.y == currlabyrinth.target_position.y
        ):
            await cube.api.motor.motor_control_target(
                timeout=50,
                movement_type=MovementType.Linear,
                speed=Speed(max=10, speed_change_type=SpeedChangeType.Constant),
                target=TargetPosition(
                    cube_location=CubeLocation(
                        point=newcoordinates,
                        angle=neworientation.value,
                    ),
                    rotation_option=RotationOption.AbsoluteOptimal,
                ),
            )
            await cube.api.indicator.turn_on(green)
            # await cube.api.sound.play_sound_effect(9)

            print("Finished")
            return "Finished"

        print("Moved")
        return "Moved"

    print("No movement")
    return "No movement"


# Change the selected puzzle and move the toio cube to the initial position
# <name>: name of the puzzle
# Returns:
# - "Cube not connected" if the cube is not connected
# - "Invalid puzzle" if the specified puzzle is not valid
# - "Updated Puzzle" if the puzzle is successfully updated
@app.get("/puzzle/<name>")
async def puzzle(name):
    global cube
    global currposition
    global currorientation
    global currlabyrinth

    if cube is None:
        return "Cube not connected", 400

    match name:
        case "labyrinth_train":
            currlabyrinth = labyrinth_train
            currorientation = labyrinth_train.initial_orientation
        case "labyrinth_p1":
            currlabyrinth = labyrinth_p1
            currorientation = labyrinth_p1.initial_orientation
        case "labyrinth_p2":
            currlabyrinth = labyrinth_p2
            currorientation = labyrinth_p2.initial_orientation
        case "labyrinth_p3":
            currlabyrinth = labyrinth_p3
            currorientation = labyrinth_p3.initial_orientation
        case "labyrinth_p4":
            currlabyrinth = labyrinth_p4
            currorientation = labyrinth_p4.initial_orientation
        case "labyrinth_p5":
            currlabyrinth = labyrinth_p5
            currorientation = labyrinth_p5.initial_orientation
        case "labyrinth_p6":
            currlabyrinth = labyrinth_p6
            currorientation = labyrinth_p6.initial_orientation

    newcoordinates = get_coordinates(currlabyrinth.initial_position)

    await cube.api.motor.motor_control_target(
        timeout=50,
        movement_type=MovementType.Linear,
        speed=Speed(max=100, speed_change_type=SpeedChangeType.Constant),
        target=TargetPosition(
            cube_location=CubeLocation(
                point=newcoordinates,
                angle=currorientation.value,
            ),
            rotation_option=RotationOption.AbsoluteOptimal,
        ),
    )

    currposition = currlabyrinth.initial_position
    currorientation = currlabyrinth.initial_orientation
    print(currposition.x, currposition.y)

    return "Updated Puzzle"


# Check if the toio cube can move in the specified direction
# <direction>: front, backward, left, right
# Returns:
# - "Invalid direction" if the specified direction is not valid
# - "cool" if the movement is possible
# - "not cool" if the movement is not possible
@app.get("/can_move/<direction>")
async def can_move(direction):
    global currposition
    global currorientation
    global currlabyrinth

    if direction not in Movement.__members__:
        return "Invalid direction", 400

    movement = Movement[direction]
    thechange = moves[currorientation][movement]
    newpos = Position(currposition.x + thechange.x, currposition.y + thechange.y)

    can_move = check_position(newpos)

    if can_move:
        return "cool", 200
    else:
        return "not cool", 400


# Dance with the toio cube
# Returns:
# - "Cube not connected" if the cube is not connected
# - "Danced" if the dance is successful
@app.get("/dance")
async def dance():
    global cube
    global currposition
    global currorientation

    if cube is None:
        return "Cube not connected", 400

    await cube.api.indicator.turn_on(purple)
    # await cube.api.sound.play_sound_effect(8, 100)
    await cube.api.motor.motor_control(30, 0)
    await asyncio.sleep(3)

    newcoordinates = get_coordinates(currposition)

    await cube.api.motor.motor_control_target(
        timeout=70,
        movement_type=MovementType.Linear,
        speed=Speed(max=10, speed_change_type=SpeedChangeType.Constant),
        target=TargetPosition(
            cube_location=CubeLocation(
                point=newcoordinates,
                angle=currorientation.value,
            ),
            rotation_option=RotationOption.AbsoluteOptimal,
        ),
    )
    await cube.api.indicator.turn_on(yellow)
    return "Danced"


# Recover the toio cube to the closest position
# Returns:
# - "Cube not connected" if the cube is not connected
# - "Position Recovered" if the position is successfully recovered
@app.get("/recover_position")
async def recover_position():
    global cube
    global currposition
    global currorientation

    if cube is None:
        return "Cube not connected", 400

    id_information = await cube.api.id_information.read()
    center = id_information.center.point
    angle = id_information.center.angle
    closest_position = Position(0, 0)
    closest_center = get_coordinates(closest_position)
    closest_distance = abs(center.x - closest_center.x) + abs(
        center.y - closest_center.y
    )

    for i in range(num_rows):
        for j in range(num_cols):
            position = Position(j, i)
            position_center = get_coordinates(position)
            distance = abs(center.x - position_center.x) + abs(
                center.y - position_center.y
            )

            if distance < closest_distance:
                closest_position = position
                closest_center = position_center
                closest_distance = distance

    closest_orientation = Orientation.north
    closest_angle = closest_orientation.value
    closest_distance = abs(angle - closest_angle)

    for orientation in Orientation:
        orientation_angle = orientation.value
        distance = abs(angle - orientation_angle)
        if distance < closest_distance:
            closest_orientation = orientation
            closest_angle = orientation_angle
            closest_distance = distance

    newcoordinates = get_coordinates(closest_position)

    await cube.api.motor.motor_control_target(
        timeout=50,
        movement_type=MovementType.Linear,
        speed=Speed(max=10, speed_change_type=SpeedChangeType.Constant),
        target=TargetPosition(
            cube_location=CubeLocation(
                point=newcoordinates,
                angle=closest_orientation.value,
            ),
            rotation_option=RotationOption.AbsoluteOptimal,
        ),
    )

    currposition = closest_position
    currorientation = closest_orientation

    return "Position Recovered"


def get_coordinates(position: Position) -> Point:
    return mat[position.y][position.x]


def check_position(position: Position) -> bool:
    global currlabyrinth

    if position.x < 0 or position.x > (num_cols - 1):
        return False
    if position.y < 0 or position.y > (num_rows - 1):
        return False
    return currlabyrinth.matrix[position.y][position.x] == 1


if __name__ == "__main__":
    app.run(host="0.0.0.0")
