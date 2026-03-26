import { execSync } from "node:child_process";

const REPO = "mirrorstack-ai/web-ui-kit";
const ORG = "mirrorstack-ai";
const PROJECT_NUMBER = 2;
const PREFIX = "WUK";

function run(cmd: string): string {
  return execSync(cmd, { encoding: "utf-8" }).trim();
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 50);
}

function main() {
  const issueNumber = process.argv[2];
  if (!issueNumber || !/^\d+$/.test(issueNumber)) {
    console.error("Usage: pnpm start-issue <issue-number>");
    console.error("Example: pnpm start-issue 1");
    process.exit(1);
  }

  // Fetch issue title
  let title: string;
  try {
    title = run(`gh issue view ${issueNumber} -R ${REPO} --json title -q .title`);
  } catch {
    console.error(`Failed to fetch issue #${issueNumber}. Is gh CLI authenticated?`);
    process.exit(1);
  }

  // Parse type prefix from title (feat:, fix:, refactor:, chore:)
  const prefixMatch = title.match(/^(feat|fix|refactor|chore|docs):\s*/i);
  const type = prefixMatch ? prefixMatch[1].toLowerCase() : "feat";
  const cleanTitle = prefixMatch ? title.slice(prefixMatch[0].length) : title;

  // Generate branch name
  const slug = slugify(cleanTitle);
  const branch = `${type}/${PREFIX}-${issueNumber}_${slug}`;

  console.log(`Issue:  #${issueNumber} — ${title}`);
  console.log(`Branch: ${branch}`);
  console.log();

  // Create branch linked to issue, or checkout if it already exists
  try {
    run(`gh issue develop ${issueNumber} -R ${REPO} --name "${branch}" --checkout`);
    console.log(`Created and checked out: ${branch}`);
  } catch {
    try {
      run(`git fetch origin`);
      run(`git checkout ${branch}`);
      console.log(`Branch already exists. Checked out: ${branch}`);
    } catch {
      // Branch doesn't exist remotely — create locally from main
      run(`git checkout -b ${branch} main`);
      console.log(`Created locally: ${branch}`);
    }
  }

  // Set project status to "In Progress"
  setProjectStatus(issueNumber, "In Progress");
}

function setProjectStatus(issueNumber: string, statusName: string) {
  try {
    // Get project item ID for this issue
    const itemQuery = run(`gh api graphql -f query='
      query {
        repository(owner: "${ORG}", name: "${REPO.split("/")[1]}") {
          issue(number: ${issueNumber}) {
            projectItems(first: 10) {
              nodes {
                id
                project { number }
              }
            }
          }
        }
      }
    '`);

    const itemData = JSON.parse(itemQuery);
    const items = itemData.data.repository.issue.projectItems.nodes;
    const projectItem = items.find((i: any) => i.project.number === PROJECT_NUMBER);

    if (!projectItem) {
      console.log(`Issue not in project #${PROJECT_NUMBER}, skipping status update.`);
      return;
    }

    // Get Status field and option IDs
    const fieldQuery = run(`gh api graphql -f query='
      query {
        organization(login: "${ORG}") {
          projectV2(number: ${PROJECT_NUMBER}) {
            id
            field(name: "Status") {
              ... on ProjectV2SingleSelectField {
                id
                options { id name }
              }
            }
          }
        }
      }
    '`);

    const fieldData = JSON.parse(fieldQuery);
    const project = fieldData.data.organization.projectV2;
    const field = project.field;
    const option = field.options.find((o: any) => o.name === statusName);

    if (!option) {
      console.log(`Status "${statusName}" not found in project.`);
      return;
    }

    // Update status
    run(`gh api graphql -f query='
      mutation {
        updateProjectV2ItemFieldValue(input: {
          projectId: "${project.id}"
          itemId: "${projectItem.id}"
          fieldId: "${field.id}"
          value: { singleSelectOptionId: "${option.id}" }
        }) {
          projectV2Item { id }
        }
      }
    '`);

    console.log(`Project status → ${statusName}`);
  } catch (e: any) {
    console.log(`Warning: could not update project status — ${e.message}`);
  }
}

main();
