// src/mock/results.js
const results = [
  {
    id: "R-101",
    competitionId: "C-099", // Links to Water Color Painting in our competitions mock
    competitionTitle: "Water Color Painting",
    isPublished: true,
    userResult: {
      rank: 4,
      grade: "A",
      marks: 89,
    },
    topWinners: [
      { rank: 1, name: "Ahmed Raza" },
      { rank: 2, name: "Rashid Ali" },
      { rank: 3, name: "Shamil K" },
    ],
    pdfLink: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Example dummy PDF
  }
];

export default results;