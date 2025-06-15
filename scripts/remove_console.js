import { readFileSync, writeFileSync } from 'fs';

const files = process.argv.slice(2);

files.forEach((file) => {
    const content = readFileSync(file, 'utf8');
    const updatedContent = content.replace(/console\.log\(.*?\);?/g, '');
    writeFileSync(file, updatedContent, 'utf8');
});