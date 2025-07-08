import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to parse CSV content
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const questions = [];
  
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    // More robust CSV parsing that handles quoted fields properly
    const values = [];
    let currentValue = '';
    let inQuotes = false;
    let j = 0;
    
    while (j < line.length) {
      const char = line[j];
      
      if (char === '"') {
        if (inQuotes && j < line.length - 1 && line[j + 1] === '"') {
          // Handle escaped quotes
          currentValue += '"';
          j += 2;
          continue;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        values.push(currentValue.trim());
        currentValue = '';
        j++;
        continue;
      } else {
        currentValue += char;
      }
      j++;
    }
    values.push(currentValue.trim());
    
    // Clean up values (remove outer quotes)
    const cleanValues = values.map(v => v.replace(/^"|"$/g, ''));
    
    // We need exactly 4 values: category, question, answer, date
    if (cleanValues.length === 4) {
      const [category, question, answer, date] = cleanValues;
      
      // Parse date from DD/MM/YYYY to YYYY-MM-DD
      const dateParts = date ? date.split('/') : [];
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        questions.push({
          category: category.trim(),
          question: question.trim(),
          answer: answer.trim(),
          date: formattedDate
        });
      } else {
        console.warn(`Invalid date format: "${date}" on line ${i + 1}`);
      }
    } else {
      console.warn(`Expected 4 values but got ${cleanValues.length} on line ${i + 1}`);
    }
  }
  
  return questions;
}

// Read and parse both CSV files
const generalCsvPath = path.join(__dirname, 'src', 'assets', 'questions', 'trivial_general.csv');
const proCsvPath = path.join(__dirname, 'src', 'assets', 'questions', 'trivial_pro.csv');

const generalCsvContent = fs.readFileSync(generalCsvPath, 'utf8');
const proCsvContent = fs.readFileSync(proCsvPath, 'utf8');

const generalQuestions = parseCSV(generalCsvContent);
const proQuestions = parseCSV(proCsvContent);

// Add round information
generalQuestions.forEach(q => q.round = 'general');
proQuestions.forEach(q => q.round = 'pro');

// Group questions by date
const questionsByDate = {};

generalQuestions.forEach(q => {
  if (!questionsByDate[q.date]) {
    questionsByDate[q.date] = { general: [], pro: [] };
  }
  questionsByDate[q.date].general.push(q);
});

proQuestions.forEach(q => {
  if (!questionsByDate[q.date]) {
    questionsByDate[q.date] = { general: [], pro: [] };
  }
  questionsByDate[q.date].pro.push(q);
});

// Sort dates and create ordered questions array
const sortedDates = Object.keys(questionsByDate).sort();
const orderedQuestions = [];
let idCounter = 1;

sortedDates.forEach(date => {
  const dateQuestions = questionsByDate[date];
  
  // Add general questions for this date first
  dateQuestions.general.forEach(q => {
    orderedQuestions.push({
      id: idCounter++,
      date: q.date,
      category: q.category,
      round: q.round,
      question: q.question,
      answer: q.answer
    });
  });
  
  // Then add pro questions for this date
  dateQuestions.pro.forEach(q => {
    orderedQuestions.push({
      id: idCounter++,
      date: q.date,
      category: q.category,
      round: q.round,
      question: q.question,
      answer: q.answer
    });
  });
});

// Write the JSON file
const outputPath = path.join(__dirname, 'src', 'data', 'questions.json');
fs.writeFileSync(outputPath, JSON.stringify(orderedQuestions, null, 2));

console.log(`Generated ${orderedQuestions.length} questions from CSV files`);
console.log(`General questions: ${generalQuestions.length}`);
console.log(`Pro questions: ${proQuestions.length}`);
console.log(`Output written to: ${outputPath}`);