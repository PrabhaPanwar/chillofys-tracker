// Get form elements
const moodForm = document.getElementById("moodForm");
const sleepForm = document.getElementById("sleepForm");
const moodRecords = document.getElementById("moodRecords");
const sleepRecords = document.getElementById("sleepRecords");
const sleepQuestion = document.getElementById("sleepQuestion");
const sleepTipsBtn = document.getElementById("sleepTipsBtn");

// Store data
const moodData = [];
const sleepData = [];

// Handle Mood Form Submission
moodForm.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const mood = document.getElementById("mood").value;
  const date = new Date();
  moodData.push({ mood, date });

  const moodRecord = document.createElement("div");
  moodRecord.classList.add("record");
  moodRecord.innerHTML = `
    <p><strong>Mood:</strong> ${mood}</p>
    <span>${date.toLocaleString()}</span>
  `;
  moodRecords.appendChild(moodRecord);
  moodForm.reset();
  
  updateMoodChart();
});

// Handle Sleep Form Submission
sleepForm.addEventListener("submit", function (e) {
  e.preventDefault();
  
  const sleepHours = parseFloat(document.getElementById("sleepHours").value);
  const sleepQuality = parseInt(document.getElementById("sleepQuality").value);
  const date = new Date();
  sleepData.push({ sleepHours, sleepQuality, date });

  const sleepRecord = document.createElement("div");
  sleepRecord.classList.add("record");
  sleepRecord.innerHTML = `
    <p><strong>Sleep:</strong> ${sleepHours} hours (Quality: ${sleepQuality}/5)</p>
    <span>${date.toLocaleString()}</span>
  `;
  sleepRecords.appendChild(sleepRecord);
  sleepForm.reset();

  // If sleep quality is bad and less than 6 hours, show additional question
  if (sleepQuality <= 2 && sleepHours < 6) {
    sleepQuestion.style.display = "block";
  } else {
    sleepQuestion.style.display = "none";
  }

  updateSleepChart();
});

// Update Mood Chart
function updateMoodChart() {
  const moodLabels = moodData.map(entry => entry.date.toLocaleDateString());
  const moodCounts = moodData.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: moodLabels,
    datasets: [
      {
        label: 'Mood Tracker',
        data: [
          moodCounts.happy || 0,
          moodCounts.neutral || 0,
          moodCounts.sad || 0,
          moodCounts.stressed || 0,
          moodCounts.angry || 0,
        ],
        backgroundColor: ['#f1c40f', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6'],
      }
    ]
  };

  const ctx = document.getElementById('moodChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: chartData,
  });
}

// Update Sleep Chart
function updateSleepChart() {
  const sleepLabels = sleepData.map(entry => entry.date.toLocaleDateString());
  const sleepHoursData = sleepData.map(entry => entry.sleepHours);

  const chartData = {
    labels: sleepLabels,
    datasets: [
      {
        label: 'Sleep Hours',
        data: sleepHoursData,
        backgroundColor: '#3498db',
        borderColor: '#2980b9',
        borderWidth: 1,
        fill: true,
      }
    ]
  };

  const ctx = document.getElementById('sleepChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: chartData,
  });
}

// Show sleep tips when clicked
sleepTipsBtn.addEventListener('click', function () {
  alert("Here are some tips for better sleep:\n1. Avoid screens before bed\n2. Stick to a regular sleep schedule\n3. Make your sleep environment comfortable");
});
