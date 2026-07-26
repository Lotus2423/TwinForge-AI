"""
TwinForge AI — Factory Assistant
LLM-powered conversational interface for factory engineers.

Uses Anthropic Claude API with structured context injection.
"""
from dataclasses import dataclass
from typing import Optional
import anthropic

@dataclass
class MachineContext:
    """All machine data injected into the LLM prompt."""
    machine_name: str
    machine_type: str
    location: str
    temperature_c: float
    temp_trend: str          # e.g. "+12°C this week"
    vibration_mms: float
    vib_trend: str           # e.g. "+42% this week"
    current_a: float
    rpm: int
    health_score: float
    failure_probability: float
    failure_type: str
    rul_days: float
    active_alerts: list[str]
    recommended_action: str

SYSTEM_PROMPT = """You are TwinForge Factory Assistant, an expert in industrial machine maintenance and predictive maintenance AI.

You help maintenance engineers and plant managers understand:
- Machine health status and what it means
- Sensor readings and why they matter
- Failure predictions and the reasoning behind them
- What maintenance actions to take and when
- Failure chains (how one problem leads to another)

Rules:
- Always cite specific sensor values and trends
- Explain failure chains clearly (e.g. Fan damage → Cooling reduces → Temperature rises → Bearing wears)
- Give concrete, actionable recommendations
- Be confident but note uncertainty when confidence is low
- Support both English and Hindi responses based on user's language
- Never be alarmist — be clear and professional
- Keep responses concise (200-350 words max)"""

def build_context_prompt(context: MachineContext) -> str:
    return f"""Current machine context:

Machine: {context.machine_name} ({context.machine_type})
Location: {context.location}

Live Sensor Readings:
  Temperature: {context.temperature_c}°C ({context.temp_trend})
  Vibration: {context.vibration_mms} mm/s ({context.vib_trend})
  Current: {context.current_a} A
  RPM: {context.rpm}

AI Prediction:
  Health Score: {context.health_score}/100
  Failure Probability: {context.failure_probability * 100:.0f}%
  Failure Type: {context.failure_type.replace('_', ' ')}
  Remaining Useful Life: {context.rul_days:.0f} days

Active Alerts: {', '.join(context.active_alerts) if context.active_alerts else 'None'}
Recommended Action: {context.recommended_action}"""

class FactoryAssistant:
    """
    Factory Assistant powered by Anthropic Claude.
    Injects machine context into every conversation.
    """

    def __init__(self, api_key: str, model: str = "claude-sonnet-4-6"):
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = model

    def chat(
        self,
        user_message: str,
        context: Optional[MachineContext] = None,
        conversation_history: Optional[list] = None,
    ) -> str:
        """
        Send a message to the Factory Assistant and get a response.

        Args:
            user_message: The engineer's question
            context: Current machine context to inject
            conversation_history: Previous messages [{"role": ..., "content": ...}]

        Returns:
            AI response string
        """
        messages = list(conversation_history or [])

        # Inject context as first user message if provided
        if context and not messages:
            messages.append({
                "role": "user",
                "content": build_context_prompt(context) + f"\n\nEngineer question: {user_message}"
            })
        else:
            messages.append({"role": "user", "content": user_message})

        response = self.client.messages.create(
            model=self.model,
            max_tokens=1000,
            system=SYSTEM_PROMPT,
            messages=messages,
        )

        return response.content[0].text
