// generate-readme.mjs
import fs from "fs";
import inquirer from "inquirer";

const questions = [
	{ type: "input", name: "projectName", message: "Tên dự án:" },
	{ type: "input", name: "description", message: "Mô tả dự án:" },
	{ type: "input", name: "install", message: "Lệnh cài đặt dependencies:" },
	{ type: "input", name: "start", message: "Lệnh khởi động dự án:" },
];

const generateReadme = async () => {
	const answers = await inquirer.prompt(questions);

	const content = `
# ${answers.projectName}

## Mô tả
${answers.description}

## Cài đặt
\`\`\`bash
${answers.install}
\`\`\`

## Khởi động dự án
\`\`\`bash
${answers.start}
\`\`\`
`;

	fs.writeFileSync("README.md", content.trim());
	console.log("README.md đã được tạo!");
};

generateReadme();
