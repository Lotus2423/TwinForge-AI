"""
WebSocket connection manager and gateway.
Handles all real-time event broadcasts to connected dashboard clients.
"""
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import Dict
import json
import logging

logger = logging.getLogger(__name__)
router = APIRouter()

class ConnectionManager:
    """Manages active WebSocket connections. One entry per client_id."""

    def __init__(self):
        self.active: Dict[str, WebSocket] = {}

    async def connect(self, client_id: str, ws: WebSocket):
        await ws.accept()
        self.active[client_id] = ws
        logger.info(f"WS client connected: {client_id} | total: {len(self.active)}")

    def disconnect(self, client_id: str):
        self.active.pop(client_id, None)
        logger.info(f"WS client disconnected: {client_id} | remaining: {len(self.active)}")

    async def broadcast(self, event: dict):
        """Broadcast an event to all connected clients."""
        message = json.dumps(event)
        dead: list[str] = []
        for cid, ws in self.active.items():
            try:
                await ws.send_text(message)
            except Exception:
                dead.append(cid)
        for cid in dead:
            self.disconnect(cid)

    async def send_to(self, client_id: str, event: dict):
        """Send an event to one specific client."""
        if ws := self.active.get(client_id):
            await ws.send_text(json.dumps(event))

manager = ConnectionManager()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(client_id: str, ws: WebSocket):
    await manager.connect(client_id, ws)
    try:
        while True:
            # Keep connection alive; clients can send ping messages
            data = await ws.receive_text()
            if data == "ping":
                await ws.send_text("pong")
    except WebSocketDisconnect:
        manager.disconnect(client_id)
