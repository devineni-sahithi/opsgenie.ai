from app.services import assistant
from app.services import incidents


def test_craft_ai_reply_mentions_latest_incident():
    repo = incidents.IncidentRepository()
    reply = assistant.craft_ai_reply("How is the pager looking?", repo.list_incidents())

    assert "INC-" in reply["response"]
    assert reply["assistant"].startswith("You are OpsGenie.AI")
