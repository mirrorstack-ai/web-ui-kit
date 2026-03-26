import { execSync } from "node:child_process";

const REPO = "mirrorstack-ai/web-ui-kit";
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

  // Create branch linked to issue
  try {
    run(`gh issue develop ${issueNumber} -R ${REPO} --name "${branch}" --checkout`);
    console.log(`Created and checked out: ${branch}`);
  } catch (e: any) {
    // gh issue develop might fail if branch exists
    if (e.message?.includes("already exists")) {
      console.log(`Branch already exists. Checking out...`);
      run(`git fetch origin ${branch}`);
      run(`git checkout ${branch}`);
    } else {
      console.error(`Failed to create branch: ${e.message}`);
      process.exit(1);
    }
  }
}

main();
