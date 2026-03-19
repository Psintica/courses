const fs = require('fs');
const path = require('path');

const coursesDir = path.join(__dirname, '../src/content/courses');
const outputDir = path.join(__dirname, '../src/data');
const outputFile = path.join(outputDir, 'courses.json');

const parseFrontmatter = (content) => {
  const match = content.match(/^---([\s\S]+?)---([\s\S]*)$/);
  if (!match) return { data: {}, content };
  
  const yaml = match[1];
  const body = match[2];
  const data = {};
  
  yaml.split('\n').forEach(line => {
    const [key, ...value] = line.split(':');
    if (key && value.length) {
      data[key.trim()] = value.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  
  return { data, content: body };
};

const main = () => {
  const courses = {};
  if (!fs.existsSync(coursesDir)) {
    console.error('Courses directory not found:', coursesDir);
    return;
  }
  const dirs = fs.readdirSync(coursesDir);

  for (const courseId of dirs) {
    const coursePath = path.join(coursesDir, courseId);
    if (!fs.statSync(coursePath).isDirectory()) continue;

    const files = fs.readdirSync(coursePath);
    courses[courseId] = { id: courseId, lessons: [] };

    for (const file of files) {
      if (!file.endsWith('.md')) continue;
      const content = fs.readFileSync(path.join(coursePath, file), 'utf-8');
      const { data, content: body } = parseFrontmatter(content);

      if (file === 'index.md') {
        const { lessons, ...rest } = data; // Don't let metadata overwrite the lessons array
        Object.assign(courses[courseId], rest);
        courses[courseId].content = body;
      } else {
        courses[courseId].lessons.push({
          id: file.replace('.md', ''),
          title: data.title || file,
          ...data,
          content: body
        });
      }
    }
    // Sort lessons
    courses[courseId].lessons.sort((a, b) => a.id.localeCompare(b.id));
  }

  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  fs.writeFileSync(outputFile, JSON.stringify(Object.values(courses), null, 2));
  console.log('Courses data generated successfully.');
};

main();
