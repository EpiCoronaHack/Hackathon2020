#!/usr/bin/env python3

################################################################################
# Server socket handler listening for paginated flight records from client
#
# Usage:
# python writer.py data_volume_path
#
# ---------------------
# Author: Lavneet Puri
################################################################################

import asyncio
import websockets
import json
import os
import sys

if len(sys.argv) < 2:
    print('Please specify data volume path as first argument to script')
    sys.exit(0)

data_volume = sys.argv[1]
print(f'Configured {data_volume} as data storage directory')


def write(schedules, path):
    """Write list of schedules to file.
       Append the json records if file already exists.

    Arguments:
        schedules {list} -- list of flight schedule records
        path {string} -- full path to file
    """
    with open(path, 'w') as file:
        for schedule in schedules:
            file.write(f'{json.dumps(schedule)}\n')


async def handler(websocket, path):
    print('New Connection')
    # keep connection alive
    while True:
        try:
            data = await websocket.recv()
            data = json.loads(data)

            code = data['code']
            schedules = data['page']
            size = len(schedules)
            filename = f'{code}-{size}.json'

            write(schedules, os.path.join(data_volume, filename))

            print(f'New page written in: {filename}')
        except websockets.ConnectionClosed:
            print(f"Connection Terminated")
            break
        except Exception as e:
            print(e)

HOST = '0.0.0.0'
PORT = 3000
start_server = websockets.serve(handler, HOST, PORT)
asyncio.get_event_loop().run_until_complete(start_server)

print(f'Listening on ws://{HOST}:{PORT}')

asyncio.get_event_loop().run_forever()
