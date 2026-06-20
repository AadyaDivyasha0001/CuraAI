const medicalData =
  require("../rag/medicalKnowledge.json");

function findDisease(symptomText) {

  const text =
    symptomText.toLowerCase();

  let bestMatch = null;
  let maxScore = 0;

  medicalData.forEach((item) => {

    let score = 0;

    item.symptoms.forEach((symptom) => {

      const symptomWords =
        symptom.toLowerCase().split(" ");

      symptomWords.forEach((word) => {

        if (
          text.includes(word)
        ) {
          score++;
        }

      });

    });

    if (score > maxScore) {

      maxScore = score;
      bestMatch = item;

    }

  });

  return (
    bestMatch || {
      disease: "Unknown Condition",
      department: "General Physician",
      advice:
        "Consult a healthcare professional for proper evaluation."
    }
  );

}

module.exports =
  findDisease;