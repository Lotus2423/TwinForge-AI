# Factory Assistant AI

## Overview

The Factory Assistant is an LLM-powered conversational AI that makes the platform accessible to non-technical factory workers. A maintenance engineer can ask questions in natural language (English or Hindi) and receive expert-level responses.

## Example Conversations

**Q:** Motor-01 ka kya problem hai?  
**A:** Motor-01 mein abhi bearing wear ki high probability detect hui hai. Pichhle 7 din mein vibration 42% badhi hai (5.2 se 7.4 mm/s). Temperature bhi 66°C se 78°C ho gayi hai. Dono trends mil kar bearing failure ka pattern dikhate hain. AI prediction: 91% failure probability, estimated 5 din mein. Aaj hi bearing inspect karein.

**Q:** When should we schedule maintenance for the pump bay?  
**A:** Based on current health scores: Pump-02 (61%) needs inspection within 2 weeks. Motor-01 (34%) is critical — do not wait. Recommended: Motor-01 this week, Pump-02 next Saturday.

## Technical Architecture

- LLM: Claude claude-sonnet-4-6 (Anthropic API)
- Context window: 8,000 tokens per conversation
- Context injection: Latest sensor data, prediction, active alerts, machine history
- Languages: English + Hindi (multilingual support)
- Conversation memory: Last 10 exchanges stored in DB

## Guardrails

The assistant must:
- Always cite specific sensor values
- Never give a recommendation without data backing
- Clearly state uncertainty when confidence is low
- Recommend professional inspection before major decisions
- Not replace certified maintenance engineers — only assist them
