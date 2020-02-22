#!/usr/bin/env python3

################################################################################
# Server socket handler listening for paginated flight records from client
#
# ---------------------
# Author: Lavneet Puri
################################################################################

import asyncio
import websockets
import json


async def handler(websocket, path):
    print(f"New Connection!")
    # keep connection alive
    while True:
        try:
            page = await websocket.recv()

            print(json.loads(page))
        except websockets.ConnectionClosed:
            print(f"Connection Terminated")
            break
        except Exception as e:
            print(e)
            # TODO: Only for debugging on client
            pass

HOST = '0.0.0.0'
PORT = 3000
start_server = websockets.serve(handler, HOST, PORT)
print(f'Listening on ws://{HOST}:{PORT}')

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
