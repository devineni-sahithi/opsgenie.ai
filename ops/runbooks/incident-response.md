# OpsGenie.AI Incident Response Playbook

## Objectives
- Restore service health quickly.
- Communicate impact and mitigation progress.
- Capture learnings for post-incident review.

## First five minutes
1. Acknowledge the page in OpsGenie.AI or PagerDuty.
2. Identify severity and affected service.
3. Summon the incident commander for SEV1/SEV2.
4. Review recent deploys and dashboards linked by OpsGenie.AI.
5. Update status channel with known impact.

## Mitigation workflow
- Follow the service-specific runbook surfaced in the incident details pane.
- Use the Ops Assistant to request additional diagnostics and playbooks.
- Keep the timeline updated with manual notes for critical actions.

## Communication cadence
- Every 15 minutes for SEV1, 30 minutes for SEV2, hourly for SEV3.
- Ensure customer support and product stakeholders receive summaries.

## Post-incident
- Close the incident in OpsGenie.AI and confirm monitoring stability.
- Schedule a blameless retrospective within 72 hours.
- File Jira tickets for follow-up actions and track to completion.
